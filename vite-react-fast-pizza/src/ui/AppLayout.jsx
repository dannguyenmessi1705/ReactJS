import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loading from "./Loading";
import { Outlet, useNavigation } from "react-router-dom";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {" "}
      {/* Thêm class grid để sử dụng grid layout grid-rows-[auto_1fr_auto] có nghĩa là 3 hàng, hàng 1 và 3 có chiều cao tự động, hàng 2 chiếm phần còn lại */}
      {isLoading && <Loading />}
      <Header />
      <div className="overflow-scroll">
        <main className=" mx-auto max-w-3xl ">
          <Outlet /> {/* Outlet sẽ render component tương ứng với route */}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
