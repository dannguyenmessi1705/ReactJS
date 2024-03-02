const Options = ({ question, answer, dispatch }) => {
  const hasAnswered = answer !== null; // Kiểm tra xem người dùng đã trả lời câu hỏi chưa
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered // Nếu người dùng đã trả lời câu hỏi thì kiểm tra xem câu trả lời có đúng không
              ? index === question.correctOption // Nếu đúng thì trả về "correct", sai thì trả về "wrong"
                ? "correct"
                : "wrong"
              : "" // Nếu chưa trả lời thì trả về ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })} // Khi click vào button thì dispatch action "newAnswer" và truyền index vào payload
          disabled={hasAnswered} // Nếu người dùng đã trả lời thì disable button
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
