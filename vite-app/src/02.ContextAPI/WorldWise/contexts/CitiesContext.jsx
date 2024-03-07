import { createContext, useContext, useEffect, useState } from "react";
const CityContext = createContext(); // Tạo ra một Context mới
const URL_API = "http://localhost:8017";
function CityProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({}); // Tạo state để lưu trữ thông tin của city hiện tại
  useEffect(() => {
    const fetcData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL_API}/cities`);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetcData();
  }, []);
  const getDetailCity = async(id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL_API}/cities/${id}`);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const context = { isLoading, cities, currentCity, getDetailCity }; // Tạo ra một object chứa các giá trị cần thiết
  return (
    <CityContext.Provider value={context}>
      {" "}
      {/* Truyền giá trị vào Provider */}
      {children} {/* Truyền các children vào */}
    </CityContext.Provider>
  );
}

// Hook sử dụng context
function useCity() {
    const context = useContext(CityContext); // Lấy giá trị từ context
    if (!context) {
      throw new Error("useCity must be used within a CityProvider");
    } // Nếu không có giá trị thì báo lỗi, Component này chỉ được sử dụng trong CityProvider
    return context; // Trả về giá trị của context
}

export { CityProvider, useCity }; // Export ra để sử dụng
