// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import React, { useState, useEffect } from "react";

const App = () => {
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const converCurrency = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      console.log(data)
      setConverted(data.rates[toCur]);
      setLoading(false);
    }
    if (fromCur === toCur || amount==0) return setConverted(amount);
    converCurrency();
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{converted && `${converted} ${toCur}`}</p>
    </div>
  );
};

export default App;
