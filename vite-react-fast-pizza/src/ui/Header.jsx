import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
function Header() {
  return (
    <header>
      <Link to="/">Fast Pizza</Link>
      <SearchOrder />
      <p>Dan</p>
    </header>
  );
}

export default Header;
