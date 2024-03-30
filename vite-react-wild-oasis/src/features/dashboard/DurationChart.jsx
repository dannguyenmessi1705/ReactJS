import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) { // Hàm prepareData nhận vào một mảng startData và một mảng stays, trả về một mảng dữ liệu đã được chuẩn bị để hiển thị trên biểu đồ
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) { // Hàm incArrayValue nhận vào một mảng arr và một field, tăng giá trị của phần tử có duration bằng field lên 1
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights; // num là số đêm lưu trú của một stay
      if (num === 1) return incArrayValue(arr, "1 night"); 
      if (num === 2) return incArrayValue(arr, "2 nights"); 
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0); // Hàm filter trả về một mảng mới chứa các phần tử của mảng đã cho thoả mãn điều kiện đã cho

  return data; // Trả về mảng dữ liệu đã được chuẩn bị
}

function DurationChart({ confirmedStays }) {
  const { darkMode } = useDarkMode();
  const startData = darkMode ? startDataDark : startDataLight; 
  const data = prepareData(startData, confirmedStays); // data là mảng dữ liệu đã được chuẩn bị để hiển thị trên biểu đồ

  return (
    <ChartBox> {/* Component ChartBox được sử dụng để tạo một hộp chứa biểu đồ */}
      <Heading as="h2">Stay duration summary</Heading> {/* Component Heading được sử dụng để tạo tiêu đề */}
      <ResponsiveContainer width="100%" height={240}> {/* Component ResponsiveContainer được sử dụng để tạo một container có thể thay đổi kích thước theo kích thước của cha */}
        <PieChart> {/* Component PieChart được sử dụng để tạo biểu đồ dạng pie */}
          <Pie // Component Pie được sử dụng để tạo một pie trong biểu đồ
            data={data} // data là thuộc tính xác định dữ liệu của pie
            nameKey="duration" // nameKey là thuộc tính xác định tên của pie
            dataKey="value" // dataKey là thuộc tính xác định dữ liệu nào sẽ được sử dụng làm dữ liệu cho pie
            innerRadius={85} // innerRadius là thuộc tính xác định bán kính trong của pie
            outerRadius={110}   // outerRadius là thuộc tính xác định bán kính ngoài của pie
            cx="40%" // cx là thuộc tính xác định tọa độ x của pie
            cy="50%" // cy là thuộc tính xác định tọa độ y của pie
            paddingAngle={3} // paddingAngle là thuộc tính xác định góc giữa các pie
          >
            {data.map((entry) => ( // Hàm map trả về một mảng mới chứa các phần tử đã được xử lý từ mảng đã cho
              <Cell // Component Cell được sử dụng để tạo một cell trong pie
                fill={entry.color} // fill là thuộc tính xác định màu sắc của cell
                stroke={entry.color} // stroke là thuộc tính xác định màu sắc của đường viền của cell
                key={entry.duration} // key là thuộc tính xác định key của cell
              />
            ))}
          </Pie>
          <Tooltip /> {/* Component Tooltip được sử dụng để tạo tooltip cho biểu đồ */}
          <Legend // Component Legend được sử dụng để tạo legend cho biểu đồ
            verticalAlign="middle" // verticalAlign là thuộc tính xác định vị trí của legend theo chiều dọc
            align="right" // align là thuộc tính xác định vị trí của legend theo chiều ngang
            width="30%" // width là thuộc tính xác định độ rộng của legend
            layout="vertical" // layout là thuộc tính xác định kiểu hiển thị của legend
            iconSize={15} // iconSize là thuộc tính xác định kích thước của icon trong legend
            iconType="circle" // iconType là thuộc tính xác định kiểu của icon trong legend
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;