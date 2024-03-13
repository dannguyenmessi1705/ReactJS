// Store lưu trữ tất cả state của ứng dụng, và cung cấp các phương thức để thay đổi state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
}; // state mặc định của ứng dụng

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload, loanPurpose: action.purpose };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}; // reducer là một hàm nhận vào state và action, trả về state mới sau khi thay đổi
