/* CLASSIC REDUX
import { createStore, combineReducers, applyMiddleware } from "redux";
// createStore: Hàm tạo store
// combineReducers: Hàm kết hợp nhiều reducer thành một reducer lớn
// applyMiddleware: Hàm thêm các middleware vào store
import {thunk} from "redux-thunk"; // Import thư viện redux-thunk để sử dụng middleware
import accountReducer from "./features/accounts/accountSlice"; // Nhập hàm reducer từ file accountSlice.js
import customerReducer from "./features/customers/customerSlice"; // Nhập hàm reducer từ file customerSlice.js

const reducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
}); // Kết hợp nhiều reducer thành một reducer lớn

const store = createStore(reducer, applyMiddleware(thunk)); // Tạo store từ reducer, và thêm middleware  thunk vào store để xử lý các action không đồng bộ

/*
import {deposit, withdraw} from "./features/accounts/accountSlice";
import {create, updateName} from "./features/customers/customerSlice";
store.dispatch(deposit(100)); // Thực hiện một action deposit, redux sẽ gọi reducer để thay đổi state của account
store.dispatch(withdraw(50)); // Thực hiện một action withdraw, redux sẽ gọi reducer để thay đổi state của account
store.dispatch(create("Alice", "123")); // Thực hiện một action create, redux sẽ gọi reducer để thay đổi state của customer
store.dispatch(updateName("Bob")); // Thực hiện một action updateName, redux sẽ gọi reducer để thay đổi state của customer
*/

/* MODERN REDUX (REDUX TOOLKIT) */
import { configureStore } from "@reduxjs/toolkit"; // Import hàm configureStore từ thư viện @reduxjs/toolkit để tạo store
import accountReducer from "./features/accounts/accountSlice"; // Nhập hàm reducer từ file accountSlice.js
import customerReducer from "./features/customers/customerSlice"; // Nhập hàm reducer từ file customerSlice.js
const store = configureStore({
  reducer: {
    // Truyền reducer vào store
    account: accountReducer, // Tạo key account với giá trị là reducer accountReducer
    customer: customerReducer, // Tạo key customer với giá trị là reducer customerReducer
  },
});
export default store; // Xuất store để sử dụng trong ứng dụng
