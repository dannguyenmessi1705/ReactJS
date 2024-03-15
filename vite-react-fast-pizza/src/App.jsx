import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Import RouterProvider, createBrowserRouter để sử dụng react-router-dom
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error"; 

import { menuLoader } from "./services/fetchData"; // Import menuLoader từ fetchData.js để fetch data từ API

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
      },
      {
        path: "/order/:orderId", // Route này sẽ render component Order "/order/:orderId"
        element: <Order />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />; // Truyền router vào RouterProvider
}

export default App;
