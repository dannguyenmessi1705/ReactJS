import { redirect } from "react-router-dom";
import { getMenu, getOrder, createOrder } from "./apiRestaurant";
import { clearCart } from "../features/cart/cartSlice";
import store from "../store";
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  ); // Tạo hàm isValidPhone để kiểm tra xem số điện thoại có hợp lệ không (có đúng định dạng không)
export async function menuLoader() {
  const menu = await getMenu();
  return menu;
} // Tạo hàm menuLoader để fetch data từ API, sau đó trả về menu

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
} // Tạo hàm orderLoader để fetch data từ API, sau đó trả về order

export async function actionCreateOrder({ request }) {
  const formData = await request.formData(); // Lấy dữ liệu từ thẻ <Form /> của component CreateOrder
  const data = Object.fromEntries(formData); // Chuyển formData thành Object
  const error = {}; // Tạo error object để chứa các lỗi
  if (!isValidPhone(data.phone)) {
    // Kiểm tra xem số điện thoại có hợp lệ không
    error.phone = "Invalid phone number"; // Nếu không hợp lệ thì gán lỗi vào error.phone
  }
  if (Object.keys(error).length) {
    // Nếu có lỗi thì trả về error
    return error; // Trả về error
  }
  // Nếu không có lỗi thì tạo order mới
  const order = {
    ...data,
    cart: JSON.parse(data.cart), // Chuyển cart từ JSON sang String
    priority: data.priority === "true", // Chuyển priority từ String sang Boolean
  };

  const newOrder = await createOrder(order); // Tạo order mới bằng call API createOrder
  store.dispatch(clearCart()); // Sau khi tạo đơn order thì xóa cart
  return redirect(`/order/${newOrder.id}`); // Sau khi tạo order mới thì redirect đến route "/order/:orderId"
} // Tạo hàm actionCreateOrder để POST dữ liệu từ thẻ <Form /> của component CreateOrder, sau
