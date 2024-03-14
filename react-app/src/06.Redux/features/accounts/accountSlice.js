// Store lưu trữ tất cả state của ứng dụng, và cung cấp các phương thức để thay đổi state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
}; // state mặc định của ứng dụng

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/convertCurrency":
      return { ...state, isLoading: true };
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
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
} // reducer là một hàm nhận vào state và action, trả về state mới sau khi thay đổi

export function deposit(amount, currency) {
  if (currency === "USD") {
    return {
      type: "account/deposit",
      payload: amount,
    };
  }
  // Trả về một hàm nhận vào dispatch để thực hiện các action không đồng bộ
  return async (dispatch) => {
    try {
      dispatch({ type: "account/convertCurrency" }); // Thực hiện action convertCurrency để báo cho store là đang thực hiện chuyển đổi tiền tệ
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      ); // Gọi API để chuyển đổi tiền tệ
      if (!res.ok) throw new Error("Failed to convert currency."); // Nếu gọi API không thành công thì throw error
      const data = await res.json(); // Lấy dữ liệu từ API
      dispatch({ type: "account/deposit", payload: data["rates"]["USD"] }); // Thực hiện action deposit với giá trị chuyển đổi từ tiền tệ sang USD sau khi gọi API thành công
    } catch (error) {
      console.error(error);
    }
  };
}

export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
// Action creator là một hàm trả về một action
