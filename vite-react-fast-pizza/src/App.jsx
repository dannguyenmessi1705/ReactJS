import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Import RouterProvider, createBrowserRouter để sử dụng react-router-dom
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
// Tạo router với các route tương ứng với các component, dùng createBrowserRouter để có thể làm việc với Data Fetching (BrowserRouter thì không thể làm việc với Data Fetching
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order/new",
    element: <CreateOrder />,
  },
  {
    path: "/order/:orderId",
    element: <Order />,
  },
]); 
function App() {
  return <RouterProvider router={router} />; // Truyền router vào RouterProvider
}

export default App;
