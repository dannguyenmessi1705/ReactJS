import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCity } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  const { currentCity, deleteCity, isLoading: isLoadingDelete } = useCity(); // Sử dụng hook useCity để lấy giá trị từ context
  const handleClick = async (e) => {
    e.preventDefault(); // Ngăn chặn form gửi đi mặc định của trình duyệt, nếu không sẽ reload trang
    deleteCity(city.id); // Gọi hàm deleteCity từ context
  };
  if (isLoadingDelete) return <Spinner />; // Nếu đang loading thì hiển thị Spinner
  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} // Tạo đường dẫn động (params là id, query là lat và lng)
        className={`${styles.cityItem} 
        ${city.id === currentCity.id ? styles["cityItem--active"] : ""}
        }`} // Nếu id của city hiện tại trùng với id của city đang xét thì thêm class cityItem--active
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
