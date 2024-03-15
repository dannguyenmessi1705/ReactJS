import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <p>App Layout</p>
      </main>
      <Outlet /> {/* Outlet sẽ render component tương ứng với route */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
