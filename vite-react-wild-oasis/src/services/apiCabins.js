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

export async function createCabin(cabin) {
  const imageName = (
    Date.now().toString() +
    "-" +
    cabin.image[0].name
  ).replaceAll("/", ""); // Tạo tên ảnh mới để tránh trùng lặp
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // Đường dẫn ảnh trên server
  // 1. Insert dữ liệu vào bảng cabins
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }]) // Insert dữ liệu vào bảng cabins, thêm đường dẫn ảnh vào dữ liệu cabin
    .select(); // Lấy dữ liệu sau khi insert
  if (error) {
    console.error(error);
    throw new Error("Couldn't deleted the cabin");
  }

  // 2. Upload ảnh lên server
  const { error: errorStorage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image[0]); // Upload ảnh lên server với tên imageName và file ảnh từ form

  // 3. Nếu có lỗi khi upload ảnh thì xóa cabin vừa tạo
  if (errorStorage) {
    console.error(errorStorage);
    deleteCabin(cabin.id);
    throw new Error("Couldn't uploaded the image");
  }
  return data;
}
