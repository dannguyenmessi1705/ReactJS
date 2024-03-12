import { useState, memo, useEffect } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  }, [number, sets, speed, durationBreak]); // Sử dụng useEffect để đồng bộ lại giá trị duration khi number, sets, speed, durationBreak thay đổi

  const handleInc = () => {
    setDuration((duration) => Math.floor(duration) + 1);
  };

  const handleDec = () => {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  };

  useEffect(() => {
    const playSound = function () {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    };
    playSound();
  }, [duration, allowSound]); // Sử dụng useEffect để đồng bộ lại giá trị duration và allowSound khi thay đổi
  /*
  - Nếu để playSound vào trong các hàm handleInc, handleDec, useEffect cập nhật duration thì mỗi khi duration thay đổi thì playSound sẽ được gọi lại 2 lần
  Nguyên nhân do, nếu handleInc sẽ gọi playsound, sau đó useEffect cập nhật duration sẽ gọi lại playsound một lần nữa
  */

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator); // Sử dụng memo để lưu lại các props trước đó, nếu props không thay đổi thì không render lại component
