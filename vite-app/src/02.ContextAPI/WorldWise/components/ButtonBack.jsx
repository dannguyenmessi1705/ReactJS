import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigate = useNavigate(); // Hàm này giúp chuyển hướng trang
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault(); // Ngăn chặn sự kiện mặc định của submit form, để ngăn sau khi submit trang sẽ bị load lại
        navigate(-1); // Chuyển hướng về trang trước đó
      }}
    >
      &larr;Back
    </Button>
  );
}

export default ButtonBack;
