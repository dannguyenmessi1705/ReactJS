import supabase from "./supabase";
const AVATAR_URL =
  "https://vrnjplundvwdtwcwyzzr.supabase.co/storage/v1/object/public/avatars";
// Login
export async function login(email, password) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message, error);
  }
  return user;
}

// Kiểm tra người dùng hiện tại đã đăng nhập chưa
export async function getCurrentUser() {
  const { data: dataSession } = await supabase.auth.getSession(); // Lấy ra session hiện tại của người dùng ở trong Local Storage
  if (!dataSession?.session) return null; // Nếu không có session thì trả về null

  const { data, error } = await supabase.auth.getUser(); // Lấy ra thông tin người dùng hiện tại từ session ở trên
  if (error) {
    throw new Error(error.message);
  }
  return data?.user; // Trả về thông tin người dùng
}

// Logout, xóa session khỏi Local Storage
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

// Signup
export async function signup(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email, // Email
    password, // Mật khẩu
    options: {
      // Thông tin khác của người dùng, đây là mục tùy chọn
      data: {
        // Dữ liệu
        fullName, // Tên đầy đủ
        avatar: "", // Ảnh đại diện
      },
    },
  }); // Tạo tài khoản mới
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Update user data
export async function updateUser({ fullName, password, avatar }) {
  let updateData;
  // Chỉ cập nhật password hoặc fullName nếu có
  if (fullName) {
    updateData = { data: { fullName } }; // Cập nhật fullName, vì trường này nằm trong data nên phải đặt trong data object
  }
  if (password) {
    updateData = { password }; // Cập nhật password nếu có password
  }

  // Cập nhật thông tin người dùng
  const { data: updateInfo, error: errorUpdateInfo } =
    await supabase.auth.updateUser(updateData);
  if (errorUpdateInfo) {
    throw new Error(errorUpdateInfo.message);
  }

  // Nếu không có ảnh đại diện thì trả về thông tin người dùng
  if (!avatar) return updateInfo;

  // Upload ảnh đại diện nếu có
  const fileName = `avatar-${updateInfo.user.id}-${Math.random()}`;
  console.log(fileName);
  const { data: updateFile, error: errorUpdateFile } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (errorUpdateFile) {
    throw new Error(errorUpdateFile.message);
  }

  // Update path ảnh vào trường avatar của user
  const { data: updateAvatar, error: errorAvatar } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${AVATAR_URL}/${fileName}`,
      },
    });
  if (errorAvatar) {
    throw new Error(errorAvatar.message);
  }
  return updateAvatar;
}
