import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
const CityContext = createContext(); // Tạo ra một Context mới
const URL_API = "http://localhost:8017";
const initialState = {
  isLoading: false,
  cities: [],
  currentCity: {},
  error: "",
}; // Trạng thái ban đầu của state

const reducer = (state, action) => {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/detail":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/create":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "loading":
      return { ...state, isLoading: true };
    case "error":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action type");
  }
};
function CityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState); // Khai bao state va dispatch
  const { isLoading, cities, currentCity, error } = state;
  useEffect(() => {
    const fetcData = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${URL_API}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: "Something went wrong" });
      }
    };
    fetcData();
  }, []);
  // Sử dụng useCallback
  const getDetailCity = useCallback(
    async (id) => {
      if (Number(currentCity.id) === Number(id)) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${URL_API}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/detail", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: "Something went wrong" });
      }
    },
    [currentCity.id] // Khi currentCity thay đổi thì mới chạy lại, không thì nó sẽ lấy giá trị đã lưu trước đo từ cache
  );
  const createCity = async (city) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${URL_API}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      dispatch({ type: "city/create", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: "Something went wrong" });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      await fetch(`${URL_API}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch (error) {
      dispatch({ type: "error", payload: "Something went wrong" });
    }
  };
  const context = {
    isLoading,
    cities,
    currentCity,
    error,
    getDetailCity,
    createCity,
    deleteCity,
  }; // Tạo ra một object chứa các giá trị cần thiết
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
  if (context === "undefined") {
    throw new Error("useCity must be used within a CityProvider");
  } // Nếu không có giá trị thì báo lỗi, Component này chỉ được sử dụng trong CityProvider
  return context; // Trả về giá trị của context
}

export { CityProvider, useCity }; // Export ra để sử dụng
