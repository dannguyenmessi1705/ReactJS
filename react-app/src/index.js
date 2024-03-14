import React from "react";
import ReactDOM from "react-dom/client";
// import "./00.PropState/PropsState.css";
// import PropsState from "./00.PropState/PropsState";
// import "./01.UseEffect/UseEffect.css";
// import UseEffect from "./01.UseEffect/UseEffect";
// import ConvertCurrency from "./01.UseEffect/ConvertCurrency";
// import "./01.UseEffect/ConverCurrency.css";
// import CustomHook from "./02.CustomHook/CustomHook";
// import "./03.BasicClasses/ClassyWeather.css";
// import ClassyWeather from "./03.BasicClasses/ClassyWeather";
// import "./04.UseReducer/UseReducer.css";
// import UseReducer from "./04.UseReducer/UseReducer";

// import BankAccount from "./04.UseReducer/BankAccount/BankAccount";

// import WorkTimer from "./05.Performance/App";
// import "./05.Performance/index.css"

import store from "./06.Redux/store";
import { Provider } from "react-redux";
import App from "./06.Redux/App";
import "./06.Redux/index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode là một công cụ để kiểm tra các warning và cảnh báo trong ứng dụng React (nhưng không phải là một công cụ để kiểm tra lỗi)
  // Thường bỏ đi khi ứng dụng được triển khai (production), chỉ dùng trong quá trình phát triển (development)
  //  {/* <PropsState /> */} {/* Props và State */}
  // <UseEffect /> // {/* useEffect */}
  // <ConvertCurrency />  // {/* useEffect */}
  // <CustomHook /> // {/* Custom Hook */}
  // <ClassyWeather /> // {/* Class Component (Basic Classes) */}
  // <BankAccount /> // {/* useReducer */}
  // <WorkTimer /> // {/* Performance */}
  <Provider store={store}>
    {" "}
    {/* Redux */}
    <App />
  </Provider>
);
