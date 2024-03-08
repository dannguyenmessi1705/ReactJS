import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import styles from "./Map.module.css";
import { useCity } from "../contexts/CitiesContext";
function Map() {
  const [mapPos, setMapPos] = useState([0, 0]); // Lưu vị trí của map
  const { cities } = useCity(); // Lấy danh sách city từ context
  const navigate = useNavigate(); // Hàm này giúp chuyển hướng trang
  const params = useParams(); // Lấy params từ đường dẫn
  const [searchParams, setSearchParams] = useSearchParams(); // Lấy query từ đường dẫn
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[0, 0]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
