import { useSelector, useDispatch } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer);
  return <h2>👋 Welcome, a</h2>;
}

export default Customer;
