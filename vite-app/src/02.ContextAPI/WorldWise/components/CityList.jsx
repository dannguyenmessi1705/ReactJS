import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";
import { useCity } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message="No cities to show" />;
  }
  return (
    <div className={styles.cityList}>
      <ul>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    </div>
  );
}

export default CityList;
