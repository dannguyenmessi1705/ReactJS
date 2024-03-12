import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import { CityProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";

// Sử dụng lazy Loading + Suspense để tách Bundle, khi người dùng truy cập đến Route đó thì mới tải xuống Bundle cần thiết
// Các Page nào không dùng lazy thì phải đưa lên top
import { lazy, Suspense } from "react";
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      {" "}
      {/* Sử dụng thẻ Suspense để gọi ra 1 loader,... chờ màn hình khi đang load, tải xuống bundle*/}
      <AuthProvider>
        <CityProvider>
          <BrowserRouter>
            <Routes>
              {/* Khai báo các route đến cho các Component */}
              <Route index element={<Homepage />}></Route>
              <Route
                path="/app"
                element={
                  <ProtectRoute>
                    <AppLayout />
                  </ProtectRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />}></Route>
                <Route path="cities" element={<CityList />}></Route>
                {/* Tạo param cho route, trước đó phải thêm Link đến params này */}
                <Route path="cities/:id" element={<City />}></Route>
                <Route path="countries" element={<CountryList />}></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              <Route path="/pricing" element={<Pricing />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </CityProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
