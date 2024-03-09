// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useURLLocation } from "../hooks/useURLLocation";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate(); // Hàm này giúp chuyển hướng trang
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useURLLocation(); // Lấy vị trí từ query trong đường dẫn
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {createCity, isLoading: isLoadingForm} = useCity(); // Lấy hàm createCity, biến isLoading từ context
  // useEffect dùng để lấy thông tin về quốc gia từ vị trí hiện tại
  useEffect(() => {
    const loadCity = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        if (!data.countryCode) throw new Error("Country not found");
        setCityName(data.city || data.locality || "Unknown");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (lat && lng) loadCity(); // Nếu có lat và lng thì gọi hàm loadCity
  }, [lat, lng]); // Khi lat hoặc lng thay đổi thì gọi lại hàm này

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn form gửi đi mặc định của trình duyệt, nếu không sẽ reload trang
    if (!cityName || !country) return; // Nếu không có cityName hoặc country thì không làm gì cả
    const newTrip = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newTrip); // Gọi hàm createCity từ context
    navigate("/app/cities"); // Chuyển hướng đến trang cities
  };

  if (!lat || !lng) return <Message message="Please choose location" />; // Nếu không có lat hoặc lng thì hiển thị thông báo
  if (isLoading) return <Spinner />; // Nếu đang loading thì hiển thị Spinner
  if (error) return <Message message={error} />; // Nếu có lỗi thì hiển thị lỗi
  return (
    <form
      className={`${styles.form} ${isLoadingForm ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        {/* Để sử dụng DatePicker thì cần import thư viện react-datepicker */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
