const NextButton = ({ dispatch, answer }) => {
  if (answer === null) return null; // Nếu người dùng chưa trả lời thì không hiển thị button
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
      Next
    </button>
  );
};

export default NextButton;
