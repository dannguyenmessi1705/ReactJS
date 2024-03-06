import {useParams, useSearchParams} from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className={styles.mapContainer}>
      <h3>Params: {params.id}</h3>
      <h3>Query lat: {searchParams.get("lat")}</h3>
      <h3>Query lng: {searchParams.get("lng")}</h3>
      <button onClick={() => setSearchParams({lat: 17, lng: 10})}>Change Query</button>
    </div>
  );
}

export default Map;
