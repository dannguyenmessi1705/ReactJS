import { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch từ thư viện react-redux để sử dụng với mục đích truyền action đến store
import { create } from "./customerSlice"; // Import action từ file customerSlice.js để sử dụng

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return; // Kiểm tra nếu không nhập đủ thông tin thì không thực hiện action
    dispatch(create(fullName, nationalId)); // Truyền action create với tham số fullName, nationalId vào store
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
