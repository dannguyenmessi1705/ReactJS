import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(); // Tạo ref để lưu element
  useEffect(() => {   // Sử dụng useEffect để thêm sự kiện click vào document
    const handleClose = (event) => { // Tạo hàm handleClose để đóng modal khi click ra ngoài modal
      if (ref.current && !ref.current.contains(event.target)) { // Nếu ref có giá trị và click không nằm trong ref thì gọi hàm handler
        handler(); // Gọi hàm handler để đóng modal
      }
    };
    document.addEventListener("click", handleClose, listenCapturing); // Thêm sự kiện click vào document với hàm handleClose và listenCapturing là true để sử dụng capturing phase (bắt sự kiện từ ngoài vào trong)
    return () => {
      document.removeEventListener("click", handleClose, listenCapturing);
    }; // Xóa sự kiện click khi component unmount
  }, [handler, listenCapturing]);
  return ref; // Trả về ref để sử dụng trong component
} // Hook để đóng modal khi click ra ngoài modal
