import { useState } from "react";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      // Kiểm tra xem trình duyệt có hỗ trợ geolocation không
      return setError("Your browser does not support geolocation"); // Nếu không hỗ trợ thì thông báo lỗi

    setIsLoading(true); // Nếu hỗ trợ thì bắt đầu lấy vị trí
    navigator.geolocation.getCurrentPosition(
      // Lấy vị trí hiện tại
      (pos) => {
        // Nếu lấy được vị trí
        setPosition({
          // Lưu vị trí vào state
          lat: pos.coords.latitude, // Lấy vĩ độ
          lng: pos.coords.longitude, // Lấy kinh độ
        }); // Lưu vị trí vào state
        setIsLoading(false); // Kết thúc việc lấy vị trí
      },
      (error) => {
        // Nếu không lấy được vị trí
        setError(error.message); // Lưu thông báo lỗi vào state
        setIsLoading(false); // Kết thúc việc lấy vị trí
      }
    );
  }
  return { isLoading, position, error, getPosition };
}

export default function App() {
  const {
    isLoading,
    position: { lat, lng },
    error,
    getPosition,
  } = useGeolocation();
  const [countClicks, setCountClicks] = useState(0);
  const handleClick = () => {
    // Khi click vào nút
    getPosition(); // Gọi hàm getPosition
    setCountClicks((count) => count + 1); // Tăng biến đếm lên 1
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
