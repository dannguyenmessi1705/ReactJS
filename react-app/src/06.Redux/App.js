import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux"; // Import useSelector từ thư viện react-redux để sử dụng với mục đích lấy thông tin từ store

function App() {
  const customer = useSelector((store) => store.customer); // Lấy thông tin customer từ store
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!customer.fullName ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
