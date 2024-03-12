import { useReducer } from "react";

const getDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return new Date(`${month} ${day} ${year}`)
}

const initialState = {count: 0, step: 1}; // Khởi tạo giá trị ban đầu cho state

const reducer = (state, action) => {
    console.log(state, action);
    switch (action.type) {
        case "inc":
            return {...state, count: state.count + state.step}; // Trả về state mới dựa trên state cũ và cập nhật count tăng thêm step lần
        case "dec":
            return {...state, count: state.count - state.step}; // Trả về state mới dựa trên state cũ và cập nhật count giảm đi step lần
        case "setCount": 
            return {...state, count: action.payload}; // Trả về state mới dựa trên state cũ và cập nhật count bằng payload
        case "setStep":
            return {...state, step: action.payload}; // Trả về state mới dựa trên state cũ và cập nhật step bằng payload
        case "reset":
            return initialState; // Trả về state mới là giá trị ban đầu
        default:
            throw new Error("Unknown action type");
    }
} // Hàm reducer nhận vào 2 tham số là state và action, trả về state mới

function DateCounter() {
    // useReducer
    const [state, dispatch] = useReducer(reducer, initialState); // useReducer nhận vào 2 tham số là hàm reducer và giá trị ban đầu của state, trả về state mới và hàm dispatch
    const {count, step} = state; // Destructuring lấy ra count và step từ state
    console.log(count, step)

  // This mutates the date object.
  const date = getDate();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type: "dec"}); // Gửi action dec
  };

  const inc = function () {
    dispatch({type: "inc"}); // Gửi action inc
  };

  const defineCount = function (e) {
    dispatch({type: "setCount", payload: Number(e.target.value)}); // Gửi action setCount với payload là giá trị của input number
  };

  const defineStep = function (e) {
    dispatch({type: "setStep", payload: Number(e.target.value)}) // Gửi action setStep với payload là giá trị của input range
  };

  const reset = function () {
    dispatch({type: "reset"}) // Gửi action reset
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
