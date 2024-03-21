import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Import RouterProvider, createBrowserRouter để sử dụng react-router-dom
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

import {
  actionCreateOrder,
  menuLoader,
  orderLoader,
  actionUpdateOrder,
} from "./services/fetchData"; // Import menuLoader từ fetchData.js để fetch data từ API

// Tạo router với các route tương ứng với các component, dùng createBrowserRouter để có thể làm việc với Data Fetching (BrowserRouter thì không thể làm việc với Data Fetching
const router = createBrowserRouter([
  {
    element: <AppLayout />, // AppLayout sẽ là layout chung cho tất cả các route
    errorElement: <Error />, // Error sẽ là layout cho các route khi có lỗi
    children: [
      // Các route con
      {
        path: "/",
        element: <Home />, // Route này sẽ render component Home
      },
      {
        path: "/menu", // Route này sẽ render component Menu "/menu"
        element: <Menu />,
        loader: menuLoader, // Sử dụng loader để fetch data từ API và trả về menu cho component Menu
        errorElement: <Error />, // Error sẽ là layout cho route "/menu" khi có lỗi, nếu có lỗi trong route "/menu" thì sẽ render Error ở đây, không phải ở AppLayout
      },
      {
        path: "/cart", // Route này sẽ render component Cart "/cart"
        element: <Cart />,
      },
      {
        path: "/order/new", // Route này sẽ render component CreateOrder "/order/new"
        element: <CreateOrder />,
        action: actionCreateOrder, // Sử dụng action để thực hiện các method như POST, PUT, DELETE, PATCH từ thẻ <Form /> từ "react-router-dom" của component CreateOrder
        // actionOrder sẽ nhận tự động nhận { request } từ route, request sẽ chứa các thông tin từ thẻ <Form />, => request.formData và truyền vào Object.fromEntries() sẽ chứa thông tin từ thẻ <Form />
      },
      {
        path: "/order/:orderId", // Route này sẽ render component Order "/order/:orderId"
        element: <Order />,
        loader: orderLoader, // Sử dụng loader để fetch data từ API và trả về order cho component Order
        // hàm orderLoader sẽ nhận tự động nhận { params } từ route, params sẽ chứa các thông tin từ route, => params.orderId sẽ chứa orderId từ route
        errorElement: <Error />, // Error sẽ là layout cho route "/menu" khi có lỗi, nếu có lỗi trong route "/menu" thì sẽ render Error ở đây, không phải ở AppLayout
        action: actionUpdateOrder, // Sử dụng action để thực hiện các method như POST, PUT, DELETE, PATCH từ thẻ <Form /> từ "react-router-dom" của component Order
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />; // Truyền router vào RouterProvider
}

export default App;
