import { memo } from "react";
function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds); // Sử dụng memo để lưu lại các props trước đó, nếu props không thay đổi thì không render lại component
