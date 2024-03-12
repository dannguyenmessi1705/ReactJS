import React from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]); // Map chứa các icon tương ứng với mã số thời tiết
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode)); // Tìm mã số thời tiết trong Map
  if (!arr) return "NOT FOUND"; // Nếu không tìm thấy thì trả về NOT FOUND
  return icons.get(arr); // Trả về icon tương ứng với mã số thời tiết
} // Hàm trả về icon tương ứng với mã số thời tiết

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt()); // Chuyển mã quốc gia thành mã Unicode
  return String.fromCodePoint(...codePoints); // Trả về cờ quốc gia tương ứng với mã quốc gia
} // Hàm trả về cờ quốc gia tương ứng với mã quốc gia

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
} // Hàm trả về ngày trong tuần tương ứng với ngày tháng năm

class ClassyWeather extends React.Component {
  // Có thể không cần constructo mà khai báo state trực tiếp `state = {}`
  // Tương tự nếu không cần bind method thì có thể viết method dưới dạng arrow function `fetchWeather = async () => {}` vì arrow function không tạo ra context riêng
  constructor(props) {
    super(props); // Gọi hàm khởi tạo của lớp cha (React.Component) với tham số props
    this.state = {
      location: "", // Khởi tạo giá trị nhập liệu cho ô input
      isLoading: false, // Khởi tạo giá trị ban đầu cho state isLoading
      displayLocation: "", // Khởi tạo giá trị ban đầu cho state displayLocation
      weatherData: {}, // Khởi tạo giá trị ban đầu cho state weatherData
    }; // Khởi tạo giá trị ban đầu cho state cho Class Component
    this.fetchWeather = this.fetchWeather.bind(this); // Bind với this để sử dụng this chính là Class Component này
  }
  async fetchWeather() {
    if (this.state.location.length < 2) { // Nếu độ dài của location nhỏ hơn 2
      this.setState({ weatherData: {} }); // Cập nhật giá trị cho state weatherData để unmount component Weather
      return; // Kết thúc hàm fetchWeather
    }
    try {
      this.setState({ isLoading: true }); // Cập nhật giá trị cho state isLoading, không cần phải spread cả object vì trong class không khai báo state là 1 constant
      // 1) Lấy thông tin địa lý
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0); // Lấy thông tin địa lý từ kết quả trả về (lấy kết quả đầu tiên)
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      }); // Cập nhật giá trị cho state displayLocation, không cần phải spread cả object vì trong class không khai báo state là 1 constant

      // 2) Lấy thông tin thời tiết
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weatherData: weatherData.daily }); // Cập nhật giá trị cho state weatherData, không cần phải spread cả object vì trong class không khai báo state là 1 constant
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false }); // Cập nhật giá trị cho state isLoading, không cần phải spread cả object vì trong class không khai báo state là 1 constant
    }
  }

  // Không cần bind thì dùng arrow function
  setLocation = (e) => this.setState({ location: e.target.value });

  componentDidMount() {
    this.setState({location: localStorage.getItem("location") || ""}) // Lấy giá trị location từ localStorage nếu có hoặc để giá trị rỗng
  } // Lifecycle method được gọi sau khi component được render lần đầu tiên

  componentDidUpdate(prevProps, prevState){
    if(prevState.location !== this.state.location){ // Nếu giá trị location thay đổi
      this.fetchWeather(); // Gọi hàm fetchWeather
      localStorage.setItem("location", this.state.location) // Lưu giá trị location vào localStorage
    }
  } // Lifecycle method được gọi sau khi component được cập nhật (props hoặc state) và trước khi render lại

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input location={this.state.location} setLocation={this.setLocation} />
        <div>
          {this.state.isLoading && <p className="loader">Loading...</p>}
          {this.state.weatherData.weathercode && (
            <Weather
              weather={this.state.weatherData}
              location={this.state.displayLocation}
            /> // Truyền props cho Weather Component
          )}
        </div>
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search location..."
          value={this.props.location} // Lấy giá trị location từ props của class Classy Weather
          onChange={this.props.setLocation} // Lấy function được truyền vào props từ Classy Weather
        />
      </div>
    );
  }
}

class Weather extends React.Component {
  componentWillUnmount(){
    alert("Weather component will be unmounted");
  } // Lifecycle method được gọi trước khi component bị unmount
  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time,
      weathercode,
    } = this.props.weather;
    const location = this.props.location;
    return (
      <div>
        <h2>Weather {location}</h2>
        <ul className="weather">
          {time.map((day, i) => {
            return (
              <Day
                key={i}
                day={formatDay(day)}
                max={max[i]}
                min={min[i]}
                weatherCode={weathercode[i]}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { day, max, min, weatherCode } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(weatherCode)}</span>
        <p>{day}</p>
        <p className="important">
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

export default ClassyWeather;
