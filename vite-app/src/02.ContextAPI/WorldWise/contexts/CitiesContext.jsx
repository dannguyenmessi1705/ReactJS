import { createContext, useContext, useEffect, useState } from "react";
const CityContext = createContext(); // Tạo ra một Context mới
const URL_API = "http://localhost:8017";
function CityProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
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
  const context = { isLoading, cities }; // Tạo ra một object chứa các giá trị cần thiết
  return (
    <CityContext.Provider value={context}>
      {" "}
      {/* Truyền giá trị vào Provider */}
      {children} {/* Truyền các children vào */}
    </CityContext.Provider>
  );
}

export { CityProvider }; // Export ra để sử dụng
