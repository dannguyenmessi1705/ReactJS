import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { darkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  }); // Hàm eachDayOfInterval trả về một mảng các ngày trong khoảng thời gian đã cho. Ví dụ: eachDayOfInterval({ start: new Date(2021, 0, 1), end: new Date(2021, 0, 5) }) trả về mảng [Thu Jan 01 2021 00:00:00 GMT+0700 (Indochina Time), Fri Jan 02 2021 00:00:00 GMT+0700 (Indochina Time), Sat Jan 03 2021 00:00:00 GMT+0700 (Indochina Time), Sun Jan 04 2021 00:00:00 GMT+0700 (Indochina Time), Mon Jan 05 2021 00:00:00 GMT+0700 (Indochina Time)]  
  // Hàm subDays là hàm trừ số ngày từ một ngày đã cho. Ví dụ: subDays(new Date(2021, 0, 5), 2) trả về ngày Tue Jan 03 2021 00:00:00 GMT+0700 (Indochina Time)
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"), // Hàm format trả về một chuỗi biểu diễn ngày đã cho theo định dạng đã cho. Ví dụ: format(new Date(2021, 0, 1), "yyyy-MM-dd") trả về chuỗi "2021-01-01"
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at))) // Hàm isSameDay trả về true nếu hai ngày đã cho cùng một ngày, ngược lại trả về false. Ví dụ: isSameDay(new Date(2021, 0, 1), new Date(2021, 0, 1)) trả về true
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = darkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart> {/* Component StyledSalesChart được sử dụng để tạo một hộp chứa biểu đồ */}
      <Heading as="h2"> {/* Component Heading được sử dụng để tạo tiêu đề */}
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "} {/* Hàm at trả về phần tử ở vị trí đã cho trong mảng. Ví dụ: [1, 2, 3].at(0) trả về 1, [1, 2, 3].at(-1) trả về 3 */}
      </Heading>

      <ResponsiveContainer height={300} width="100%"> {/* Component ResponsiveContainer được sử dụng để tạo một container có thể thay đổi kích thước theo kích thước của cha */}
        <AreaChart data={data}> {/* Component AreaChart được sử dụng để tạo biểu đồ dạng area */}
          <XAxis // Component XAxis được sử dụng để tạo trục x của biểu đồ
            dataKey="label" // dataKey là thuộc tính xác định dữ liệu nào sẽ được sử dụng làm dữ liệu cho trục x
            tick={{ fill: colors.text }} // tick là thuộc tính xác định kiểu và màu sắc của các tick trên trục x
            tickLine={{ stroke: colors.text }} // tickLine là thuộc tính xác định màu sắc của các đường dọc trên trục x
          />
          <YAxis // Component YAxis được sử dụng để tạo trục y của biểu đồ
            unit="$" // unit là thuộc tính xác định đơn vị của trục y
            tick={{ fill: colors.text }} // tick là thuộc tính xác định kiểu và màu sắc của các tick trên trục y
            tickLine={{ stroke: colors.text }} // tickLine là thuộc tính xác định màu sắc của các đường dọc trên trục y
          />
          <CartesianGrid strokeDasharray="4" /> {/* Component CartesianGrid được sử dụng để tạo lưới cho biểu đồ */}
          <Tooltip contentStyle={{ backgroundColor: colors.background }} /> {/* Component Tooltip được sử dụng để tạo tooltip cho biểu đồ */}
          <Area // Component Area được sử dụng để tạo một area trong biểu đồ
            dataKey="totalSales" // dataKey là thuộc tính xác định dữ liệu nào sẽ được sử dụng làm dữ liệu cho area
            type="monotone" // type là thuộc tính xác định kiểu của area
            stroke={colors.totalSales.stroke} // stroke là thuộc tính xác định màu sắc của đường viền của area
            fill={colors.totalSales.fill} // fill là thuộc tính xác định màu sắc của area
            strokeWidth={2} // strokeWidth là thuộc tính xác định độ rộng của đường viền của area
            name="Total sales" // name là thuộc tính xác định tên của area
            unit="$" // unit là thuộc tính xác định đơn vị của area
          />
          <Area // Component Area được sử dụng để tạo một area trong biểu đồ
            dataKey="extrasSales" // dataKey là thuộc tính xác định dữ liệu nào sẽ được sử dụng làm dữ liệu cho area
            type="monotone" // type là thuộc tính xác định kiểu của area
            stroke={colors.extrasSales.stroke} // stroke là thuộc tính xác định màu sắc của đường viền của area
            fill={colors.extrasSales.fill} // fill là thuộc tính xác định màu sắc của area
            strokeWidth={2} // strokeWidth là thuộc tính xác định độ rộng của đường viền của area
            name="Extras sales" // name là thuộc tính xác định tên của area
            unit="$" // unit là thuộc tính xác định đơn vị của area
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
