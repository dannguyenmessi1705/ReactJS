import { useSelector } from "react-redux"; // Import useSelector từ thư viện react-redux để sử dụng với mục đích lấy thông tin từ store

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useSelector(store => store.account); // Lấy thông tin balance của account từ store
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
