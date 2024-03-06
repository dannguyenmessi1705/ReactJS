import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useEffect, useState } from "react";

const URL_API = "http://localhost:8017";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetcData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL_API}/cities`);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetcData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* Khai báo các route đến cho các Component */}
        <Route index element={<Homepage />}></Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>}></Route>
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}></Route>
          {/* Tạo param cho route, trước đó phải thêm Link đến params này */}
          <Route path="cities/:id" element={<City/>}></Route>
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}></Route>
          <Route path="form" element={<Form />}></Route>
        </Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
