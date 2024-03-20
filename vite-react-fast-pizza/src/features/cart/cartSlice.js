import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
/*
 cart: [
    {
        pizzaId,
        name,
        quantity,
        unitPrice,
        totalPrice
    }
 ]
*/

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      // payload = cart
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
    },
    increaseItem(state, action) {
      // payload = pizzaId
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      pizza.quantity++;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
    },
    decreaseItem(state, action) {
      // payload = pizzaId
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      pizza.quantity--;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
      if (pizza.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action); // Gọi lại actions đã định nghĩa, nếu số lượng = 0 tương đương xóa item
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
