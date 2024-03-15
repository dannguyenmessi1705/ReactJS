import { getMenu, getOrder } from "./apiRestaurant";
export async function menuLoader() {
  const menu = await getMenu();
  return menu;
} // Tạo hàm menuLoader để fetch data từ API, sau đó trả về menu

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
} // Tạo hàm orderLoader để fetch data từ API, sau đó trả về order
