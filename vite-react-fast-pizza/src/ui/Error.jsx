import { useRouteError } from "react-router-dom"; // Sử dụng useNavigate để điều hướng trang, useRouteError để lấy thông tin lỗi
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError(); // Lấy thông tin lỗi từ route

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>{" "}
      {/* Hiển thị thông tin lỗi .data(route) hoặc .message(api) */}
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
