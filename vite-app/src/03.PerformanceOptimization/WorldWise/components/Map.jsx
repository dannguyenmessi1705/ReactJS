import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useCity } from "../contexts/CitiesContext";
import Button from "./Button";
import { useURLLocation } from "../hooks/useURLLocation";
function Map() {
  const [mapPos, setMapPos] = useState([0, 0]); // Lưu vị trí của map
  const { cities } = useCity(); // Lấy danh sách city từ context
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geoPosition,
  } = useGeolocation(); // Sử dụng hook useGeolocation để lấy vị trí hiện tại
  const [latMap, lngMap] = useURLLocation(); // Lấy vị trí từ query trong đường dẫn
  // useEffect để lấy vị trí của map từ query trong đường dẫn
  useEffect(() => {
    if (latMap && lngMap) setMapPos([latMap, lngMap]); // Set vị trí của map nếu có query lat và lng
  }, [latMap, lngMap]); // Khi latMap hoặc lngMap thay đổi thì gọi lại hàm này
  // useEffect để lấy vị trí của map từ geolocation (định vị vị trí hiện tại)
  useEffect(() => {
    if (geoPosition) setMapPos([geoPosition.lat, geoPosition.lng]); // Set vị trí của map nếu có vị trí từ geolocation
  }, [geoPosition]); // Khi geoPosition thay đổi thì gọi lại hàm này
  return (
    <div className={styles.mapContainer}>
      {!geoPosition && ( // Nếu có vị trí từ geolocation thì không hiển thị nút này
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Get my position"}
        </Button> 
      )} {/* Nút này sẽ gọi hàm getPosition để lấy vị trí hiện tại */}
      <MapContainer
        center={mapPos}
        zoom={6}
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
        <ChangeMap position={mapPos} />{" "}
        {/* Component này sẽ thay đổi vị trí của map */}
        <HandleClickMap />
      </MapContainer>
    </div>
  );
}

const ChangeMap = ({ position }) => {
  const map = useMap(); // Lấy map từ thư viện react-leaflet
  map.setView(position); // Set vị trí mới cho map
  return null; // Không cần hiển thị gì cả
}; // Hàm này sẽ thay đổi vị trí của map

const HandleClickMap = () => {
  const navigate = useNavigate(); // Lấy hàm navigate từ thư viện react-router-dom
  useMapEvents({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); // Khi click vào map thì thay đổi đường dẫn, chuyển đến trang form và truyền query lat và lng
    },
  });
};
export default Map;
