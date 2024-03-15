import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loading from "./Loading";
import { Outlet, useNavigation } from "react-router-dom";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loading />}
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
