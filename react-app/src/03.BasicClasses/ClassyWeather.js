import React from "react";

class ClassyWeather extends React.Component {
  constructor(props) {
    super(props); // Gọi hàm khởi tạo của lớp cha (React.Component) với tham số props
    this.state = { location: "" }; // Khởi tạo giá trị ban đầu cho state cho Class Component
    this.fetchWeather = this.fetchWeather.bind(this); // Bind với this để sử dụng this chính là Class Component này
  }
  fetchWeather() {
    console.log(this);
  }
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search location..."
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        <button onClick={this.fetchWeather}>Watch Weather</button>
      </div>
    );
  }
}

export default ClassyWeather;
