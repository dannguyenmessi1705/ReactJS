import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Price from "./page/Price";
import Product from "./page/Product";
import NotFound from "./page/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/price" element={<Price />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
