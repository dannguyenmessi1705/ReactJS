import { useState } from "react";
import PropTypes from "prop-types"; // import thư viện prop-types để kiểm tra kiểu dữ liệu của props

const containerStyle = {
  // style cho container chứa các sao và text
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  // style cho container chứa các sao
  display: "flex",
};

StarRating.propTypes = {
  // Kiểm tra kiểu dữ liệu của props
  maxRating: PropTypes.number, // maxRating là một số
  defaultRating: PropTypes.number, // defaultRating là một số
  color: PropTypes.string, // color là một chuỗi
  size: PropTypes.number, // size là một số
  messages: PropTypes.array, // messages là một mảng
  className: PropTypes.string, // className là một chuỗi
  onSetRating: PropTypes.func, // onSetRating là một hàm
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating); // rating là state để lưu trữ số sao người dùng đánh giá
  const [tempRating, setTempRating] = useState(0); // tempRating là state để lưu trữ số sao người dùng đang hover

  function handleRating(rating) {
    // hàm xử lý khi người dùng đánh giá
    setRating(rating); // cập nhật state rating
    onSetRating(rating); // gọi hàm onSetRating
  }

  const textStyle = {
    // style cho text
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      {" "}
      {/* Container chứa các sao và text */}
      <div style={starContainerStyle}>
        {" "}
        {/* Container chứa các sao */}
        {Array.from(
          { length: maxRating },
          (
            _,
            i // Tạo một mảng với độ dài là maxRating
          ) => (
            <Star // Component Star
              key={i} // key
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1} // full là một boolean, nếu tempRating tồn tại thì so sánh tempRating với i + 1, ngược lại so sánh rating với i + 1
              onRate={() => handleRating(i + 1)} // gọi hàm handleRating khi người dùng click vào sao
              onHoverIn={() => setTempRating(i + 1)} // gọi hàm setTempRating khi người dùng hover vào sao
              onHoverOut={() => setTempRating(0)} // gọi hàm setTempRating khi người dùng hover ra khỏi sao
              color={color} // color của sao
              size={size} // size của sao
            />
          )
        )}
      </div>
      <p style={textStyle}>
        {" "}
        {/* Text */}
        {messages.length === maxRating // Nếu messages có độ dài bằng maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1] // Nếu tempRating tồn tại thì lấy messages[tempRating - 1], ngược lại lấy messages[rating - 1]
          : tempRating || rating || ""}{" "}
        {/* Nếu tempRating hoặc rating tồn tại thì hiện tempRating hoặc rating, ngược lại hiện rỗng */}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  // Component Star
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR



*/
