import React, { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";

const initState = {
  questions: [],
  status: "loading" // status gán là "loading", "ready", "error", "active" tùy thuộc vào trạng thái của ứng dụng
}; // Đây là state khởi tạo

const reducer = (state, action) => {
  switch (action.type){
    case "dataReceived": // Nếu action.type là "dataReceived"
      return {...state, questions: action.payload, status: "ready"}; // Trả về state mới
    case "dataFailed": // Nếu action.type là "dataFailed"
      return {...state, status: "error"}; // Trả về state mới
    default:
      throw new Error("Unkwown action"); // Nếu action.type không khớp với bất kỳ case nào thì throw error
  }  
}; // Đây là reducer

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState); // Khai báo state và dispatch từ useReducer, reducer và initState
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const res = await fetch("http://localhost:8175/questions");
        if (!res.ok) throw new Error("Error to fetch"); // Nếu fetch không thành công thì throw error
        const data = await res.json(); // Nếu fetch thành công thì parse data từ json
        dispatch({type: "dataReceived", payload: data}); // Dispatch action "dataReceived" và truyền data vào payload
      } catch (err){
        dispatch({type: "dataFailed"}); // Nếu fetch không thành công thì dispatch action "dataFailed"
      }
    }
    loadQuestion();
  }, []) // Sử dụng useEffect để fetch data từ server và dispatch action tương ứng
  return (
    <div className="app">
      <Header />
      <Main>
        <p>Questtion</p>
        <p>1/15</p>
      </Main>
    </div>
  )
};

export default App;
