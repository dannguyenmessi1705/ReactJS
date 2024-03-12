import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message="No countries to show" />;
  }
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      // Nếu arr không chứa country của city thì thêm vào arr
      return [...arr, { country: city.country, emoji: city.emoji }]; // Trả về mảng mới với country của city được thêm vào
    } else {
      // Nếu arr đã chứa country của city thì trả về arr (tránh trùng country)
      return arr; // Trả về mảng cũ
    }
  }, []); // Khởi tạo mảng rỗng
  return <div className={styles.countryItem}>
    <ul>
        {countries.map(country => <CountryItem country={country} key={Math.random()}/>)}
    </ul>
  </div>;
}

export default CountryList;
