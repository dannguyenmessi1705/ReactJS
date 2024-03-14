/* CLASSICAL REDUX 
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
*/
import { createSlice } from "@reduxjs/toolkit"; // Import createSlice từ thư viện redux toolkit để tạo ra một slice (một phần của store)
const initialState = { 
  fullName: "",
  nationalId: "",
  createdAt: "",
}; // state mặc định của ứng dụng
// Tạo ra một slice với tên là customer, state mặc định là initialState, và các reducers là các hàm thay đổi state
const customerSlice = createSlice({ 
  name: "customer", // Tên của slice để xác định state của slice trong store
  initialState, // State mặc định của slice 
  reducers: { // Các reducers là các hàm thay đổi state
    create: { // Hàm thay đổi state khi thực hiện action create (type: "customer/create")
      prepare: (fullName, nationalId) => { // Hàm prepare trả về một object action chứa payload của action
        return {
          payload: {
            fullName,
            nationalId,
          },
        };
      },
      reducer: (state, action) => { // Hàm reducer thực hiện thay đổi state
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = new Date().toISOString();
      },
    }, 
    updateName: (state, action) => { // Hàm thay đổi state khi thực hiện action updateName (type: "customer/updateName")
      state.fullName = action.payload.fullName;
    },
  },
});
 
export default customerSlice.reducer; // Xuất reducer của slice để sử dụng trong store
export const { create, updateName } = customerSlice.actions; // Xuất các action creator để sử dụng trong ứng dụng
