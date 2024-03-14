import { useState } from "react";
// Import useDispatch từ thư viện react-redux để sử dụng với mục đích truyền action đến store
// Import useSelector từ thư viện react-redux để sử dụng với mục đích lấy thông tin từ store
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountSlice"; // Import action từ file accountSlice.js để sử dụng

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  const account = useSelector((store) => store.account);
  const dispatch = useDispatch();

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount)); // Truyền action deposit với tham số depositAmount vào store
    setDepositAmount(""); // Reset lại giá trị của input sau khi thực hiện action
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return; // Kiểm tra nếu không nhập đủ thông tin thì không thực hiện action
    dispatch(withdraw(withdrawalAmount)); // Truyền action withdraw với tham số withdrawalAmount vào store
    setWithdrawalAmount(""); // Reset lại giá trị của input sau khi thực hiện action
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose)); // Truyền action requestLoan với tham số loanAmount, loanPurpose vào store
    setLoanAmount(""); // Reset lại giá trị của input sau khi thực hiện action
    setLoanPurpose(""); // Reset lại giá trị của input sau khi thực hiện action
  }

  function handlePayLoan() {
    dispatch(payLoan()); // Truyền action payLoan vào store
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>
        {account.loan > 0 && (
          <div>
            <span>
              Pay back ${account.loan} ({account.loanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
