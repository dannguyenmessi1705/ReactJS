import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

import { useQuery } from "@tanstack/react-query";

export default function useBookings() {
  const [searchParam] = useSearchParams(); // Lấy ra các tham số trên URL

  // Filter from Server side
  const currentFilter = searchParam.get("status") || ""; // Lấy ra tham số status từ URL
  const filter =
    !currentFilter || currentFilter === "all"
      ? null
      : {
          field: "status",
          value: currentFilter,
        }; // Nếu không có tham số status hoặc tham số status là all thì filter = null, ngược lại thì filter = {field: "status", value: currentFilter}
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter], // Key để lưu cache, nếu key thay đổi thì dữ liệu sẽ được fetch lại, nên phải truyền filter vào key để khi filter thay đổi thì dữ liệu sẽ được fetch lại
    queryFn: () => getBookings(filter), // Lấy ra danh sách booking từ API với điều kiện filter
  });
  return { bookings, isLoading };
}
