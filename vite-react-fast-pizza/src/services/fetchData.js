import { getMenu } from "./apiRestaurant";
export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}  // Tạo hàm menuLoader để fetch data từ API, sau đó trả về menu
