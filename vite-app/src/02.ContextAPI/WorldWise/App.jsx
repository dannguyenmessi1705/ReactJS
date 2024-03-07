import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CountryList from "./components/CountryList";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import { CityProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          {/* Khai báo các route đến cho các Component */}
          <Route index element={<Homepage />}></Route>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />}></Route>
            <Route
              path="cities"
              element={<CityList />}
            ></Route>
            {/* Tạo param cho route, trước đó phải thêm Link đến params này */}
            <Route path="cities/:id" element={<City />}></Route>
            <Route
              path="countries"
              element={<CountryList />}
            ></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
