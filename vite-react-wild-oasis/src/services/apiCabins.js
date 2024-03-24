import supabase from "./supabase";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Couldn't loaded data from server");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Couldn't deleted the cabin");
  }
  return data;
}

export async function createCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin]) // Insert dữ liệu vào bảng cabins
    .select(); // Lấy dữ liệu sau khi insert
  if (error) {
    console.error(error);
    throw new Error("Couldn't deleted the cabin");
  }
  return data;
}
