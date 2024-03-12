import { useEffect } from "react";
import { useCity } from "../contexts/CitiesContext";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams(); // Lấy id từ params của route
  const { currentCity, getDetailCity, isLoading } = useCity(); // Sử dụng hook useCity để lấy giá trị từ context
  useEffect(() => {
    getDetailCity(id); // Gọi hàm getDetailCity để lấy thông tin của city hiện tại
  }, [id, getDetailCity]); // Khi id thay đổi thì gọi lại hàm getDetailCity
  /* 
    Tuy nhiên nếu truyền mỗi id vào dependences array thì eslint sẽ báo lỗi, chúng ta phải truyền thêm hàm getDetailCity nữa
    Nhưng khi truyền getDetailCity vào sẽ gây ra vòng lặp vô hạn, vì mỗi lần useEffect thực hiện thì getDetailCity trong Provider cũng thực hiện
    Với function thuộc kiểu tham chiếu, lúc render lại nó sẽ luôn tạo ra 1 object khác => Dùng useCallback() ở Provider
  */

  if (isLoading) return <Spinner />; // Nếu đang loading thì hiển thị Spinner

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
