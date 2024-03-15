import { useNavigate, useRouteError } from 'react-router-dom'; // Sử dụng useNavigate để điều hướng trang, useRouteError để lấy thông tin lỗi

function NotFound() {
  const navigate = useNavigate(); // Sử dụng navigate để điều hướng trang
  const error = useRouteError(); // Lấy thông tin lỗi từ route

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p> {/* Hiển thị thông tin lỗi .data(route) hoặc .message(api) */}
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
