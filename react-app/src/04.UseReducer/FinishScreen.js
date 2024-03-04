const FinishScreen = ({ score, maxScore, highScore, dispatch }) => {
  const percent = (score / maxScore) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxScore} (
        {Math.ceil(percent)}%)
      </p>
      <p className="highscore">
        (High Score: <strong>{highScore}</strong>)
      </p>
      <div className="start">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </div>
    </>
  );
};
export default FinishScreen;
