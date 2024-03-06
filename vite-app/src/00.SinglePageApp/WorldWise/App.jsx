import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Khai báo các route đến cho các Component */}
        <Route index element={<Homepage />}></Route>
        <Route path="/app" element={<AppLayout />}>
            <Route index element={<p>List of cities</p>}></Route>
            <Route path="cities" element={<p>List of cities</p>}></Route>
            <Route path="countries" element={<p>List of countries</p>}></Route>
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
