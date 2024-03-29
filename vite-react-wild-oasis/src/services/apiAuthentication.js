import supabase from "./supabase";
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
