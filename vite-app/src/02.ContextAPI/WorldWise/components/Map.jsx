import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import styles from "./Map.module.css";
function Map() {
  const [mapPos, setMapPos] = useState([0, 0]); // Lưu vị trí của map
  const navigate = useNavigate(); // Hàm này giúp chuyển hướng trang
  const params = useParams(); // Lấy params từ đường dẫn
  const [searchParams, setSearchParams] = useSearchParams(); // Lấy query từ đường dẫn
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPos}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
