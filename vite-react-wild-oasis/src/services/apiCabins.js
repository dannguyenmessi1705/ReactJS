import supabase, { supabaseUrl } from "./supabase";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Couldn't loaded data from server");
  }
  return data;
}

export async function deleteCabin(id) {
  const imagePath = (
    await supabase.from("cabins").select("image").eq("id", id)
  ).data[0].image.split("cabin-images/")[1]; // Lấy đường dẫn ảnh từ server để xóa ảnh trên server
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // Xóa cabin theo id
  if (error) {
    console.error(error);
    throw new Error("Couldn't deleted the cabin");
  }
  const { error: errorStorage } = await supabase.storage
    .from("cabin-images")
    .remove([imagePath]); // Xóa ảnh trên server
  if (errorStorage) {
    console.error(errorStorage);
    throw new Error("Couldn't deleted the image");
  }
  return data;
}

export async function createCabin(cabin, id) {
  let imageName = null;
  let imagePath = null;
  console.log(cabin, id)
  const isNewImage = cabin.image[0] instanceof File; // Kiểm tra xem ảnh mới hay cũ
  if (isNewImage) {
    imageName = (Date.now().toString() + "-" + cabin.image[0].name).replaceAll(
      "/",
      ""
    ); // Tạo tên ảnh mới để tránh trùng lặp
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // Đường dẫn ảnh trên server
  } else {
    imagePath = cabin.image; // Lấy tên ảnh cũ
  }
  // Nếu id tồn tại thì sửa cabin, ngược lại thì tạo mới
  if (id) {
    const { data, errorEdit } = await supabase
      .from("cabins")
      .update({ ...cabin, image: imagePath })
      .eq("id", id)
      .select();
    if (errorEdit) {
      console.error(errorEdit);
      throw new Error("Couldn't edit the cabin");
    }
  } else {
    // 1. Insert dữ liệu vào bảng cabins
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...cabin, image: imagePath }]) // Insert dữ liệu vào bảng cabins, thêm đường dẫn ảnh vào dữ liệu cabin
      .select(); // Lấy dữ liệu sau khi insert
    if (error) {
      console.error(error);
      throw new Error("Couldn't create the cabin");
    }
  }

  // 2. Upload ảnh lên server
  if (!isNewImage) return; // Nếu không phải ảnh mới thì không cần upload ảnh
  const { error: errorStorage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image[0]); // Upload ảnh lên server với tên imageName và file ảnh từ form

  // 3. Nếu có lỗi khi upload ảnh thì xóa cabin vừa tạo
  if (errorStorage) {
    console.error(errorStorage);
    deleteCabin(cabin.id);
    throw new Error("Couldn't uploaded the image");
  }
}
