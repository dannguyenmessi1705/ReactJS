const StartScreen = ({ numQuestions, dispatch }) => {
  // dispatch chính là hàm dispatch từ useReducer, khi đưa vào onClick phải truyền cho nó 1 callback function
  // vì ta đang muốn thay đổi state của ứng dụng
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's go
      </button>
    </div>
  );
};
export default StartScreen;
