import {useParams, useSearchParams, useNavigate} from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate(); // Hàm này giúp chuyển hướng trang
  const params = useParams(); // Lấy params từ đường dẫn
  const [searchParams, setSearchParams] = useSearchParams(); // Lấy query từ đường dẫn
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}> {/* Khi click vào map sẽ chuyển hướng đến form */}
      <h3>Params: {params.id}</h3>
      <h3>Query lat: {searchParams.get("lat")}</h3>
      <h3>Query lng: {searchParams.get("lng")}</h3>
      <button onClick={() => setSearchParams({lat: 17, lng: 10})}>Change Query</button>
    </div>
  );
}

export default Map;
