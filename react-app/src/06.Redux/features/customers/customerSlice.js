// Store lưu trữ tất cả state của ứng dụng, và cung cấp các phương thức để thay đổi state
const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
}; // state mặc định của ứng dụng

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
} // reducer là một hàm nhận vào state và action, trả về state mới sau khi thay đổi

// Action creator là một hàm trả về một action
export function create(fullName, nationalId) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return {
    type: "account/withdraw",
    payload: fullName,
  };
}
