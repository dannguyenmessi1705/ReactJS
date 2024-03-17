import { Link } from "react-router-dom";
function CartOverview() {
  return (
    <div className="bg-stone-700 uppercase text-stone-200">
      <p className="uppercase text-stone-200">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
