import { useState } from "react";
export default function App() {
  return (
    <div className="App">
      Welcome to the Bill Calculator
      <CalculateBill />
    </div>
  );
}

function CalculateBill() {
  const [bill, setBill] = useState(null);
  const [tip1, setTip1] = useState("");
  const [tip2, setTip2] = useState("");
  const total = bill + (bill * (tip1 + tip2)) / 2 / 100;
  const resetHandle = () => {
    setBill(null);
    setTip1(null);
    setTip2(null);
  };
  return (
    <div>
      <Bill bill={bill} onSetBill={setBill} />
      <Tip percent={tip1} onSetTip={setTip1}>
        <label>Your rate %</label>
      </Tip>
      <Tip percent={tip2} onSetTip={setTip2}>
        <label>Your friend's rate %</label>
      </Tip>
      {bill > 0 && (
        <>
          <Total
            total={total}
            bill={bill}
            tip={(bill * (tip1 + tip2)) / 2 / 100}
          />
          <Reset onReset={resetHandle} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <div>
      <label>How's much the bill ?</label>
      <input
        type="number"
        step={0.1}
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Tip({ children, percent, onSetTip }) {
  return (
    <div>
      {children}
      <select
        value={percent}
        onChange={(e) => onSetTip(Number(e.target.value))}
      >
        <option value="0">0% (Normal)</option>
        <option value="10">10% (Interested)</option>
        <option value="15">15% (Statisfied)</option>
        <option value="20">20% (Very Statisfied)</option>
      </select>
    </div>
  );
}

function Total({ total, bill, tip }) {
  return (
    <p>
      The total bill is {total}$ price ({bill}$ + {tip}$ tips)
    </p>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
