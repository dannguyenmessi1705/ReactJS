const FinishScreen = ({ score, maxScore, highScore }) => {
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
    </>
  );
};
export default FinishScreen;
