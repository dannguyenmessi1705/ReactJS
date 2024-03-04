import React, { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progess";

const initState = {
  questions: [],
  status: "loading", // status gán là "loading", "ready", "error", "active" tùy thuộc vào trạng thái của ứng dụng
  index: 0, // index để lưu vị trí của câu hỏi hiện tại
  answer: null, // answer để lưu câu trả lời của người dùng
  score: 0, // score để lưu điểm của người dùng
}; // Đây là state khởi tạo

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived": // Nếu action.type là "dataReceived"
      return { ...state, questions: action.payload, status: "ready" }; // Trả về state mới
    case "dataFailed": // Nếu action.type là "dataFailed"
      return { ...state, status: "error" }; // Trả về state mới
    case "active":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions[state.index]; // Lấy ra câu hỏi hiện tại từ state
      return {
        ...state,
        answer: action.payload, // Gán answer bằng payload
        score:
          question.correctOption === action.payload // Kiểm tra xem câu trả lời có đúng không, phải lấy từ payload chứ không phải từ state vì state chưa cập nhật
            ? state.score + question.points
            : state.score, // Nếu câu trả lời đúng thì cộng thêm điểm, sai thì không cộng
      }; // Trả về state mới với answer mới
    case "nextQuestion":
      return {...state, index: state.index + 1, answer: null}; // Trả về state mới với index tăng lên 1 và answer bằng null để reset lại câu trả lời
    default:
      throw new Error("Unkwown action"); // Nếu action.type không khớp với bất kỳ case nào thì throw error
  }
}; // Đây là reducer

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState); // Khai báo state và dispatch từ useReducer, reducer và initState
  const { questions, status, index, answer, score } = state; // Destructuring state thành questions và status
  const maxScores = questions.reduce((acc, question) => acc + question.points, 0); // Tính tổng điểm của tất cả câu hỏi
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const res = await fetch("http://localhost:8175/questions");
        if (!res.ok) throw new Error("Error to fetch"); // Nếu fetch không thành công thì throw error
        const data = await res.json(); // Nếu fetch thành công thì parse data từ json
        dispatch({ type: "dataReceived", payload: data }); // Dispatch action "dataReceived" và truyền data vào payload
      } catch (err) {
        dispatch({ type: "dataFailed" }); // Nếu fetch không thành công thì dispatch action "dataFailed"
      }
    };
    loadQuestion();
  }, []); // Sử dụng useEffect để fetch data từ server và dispatch action tương ứng
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {/* Truyền numQuestions và dispatch vào StartScreen */}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress numQuestion={questions.length} scores={score} answer={answer} index={index} maxPoint={maxScores}/>
            <Question
              question={questions[index]}
              key={questions[index].id}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} numQuestion={questions.length} index={index}/>
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
