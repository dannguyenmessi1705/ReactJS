import { useLoaderData } from "react-router-dom"; // Sử dụng useLoaderData để lấy data từ loader truyền vào
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData(); // Sử dụng useLoaderData để lấy data từ loader truyền vào từ App.jsx
  return (
    <ul className="divide-y divide-slate-300 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} /> // Render từng pizza trong menu
      ))}
    </ul>
  );
}

export default Menu;
