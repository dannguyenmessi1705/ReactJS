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

  // Sort from Server side
  const currentSort = searchParam.get("sortBy") || "startDate-desc";
  const [field, value] = currentSort.split("-");
  const sortBy = { field, value };

  // Filter from Server side
  const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"))

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // Key để lưu cache, nếu key thay đổi thì dữ liệu sẽ được fetch lại, nên phải truyền filter vào key để khi filter thay đổi thì dữ liệu sẽ được fetch lại
    queryFn: () => getBookings(filter, sortBy, page), // Lấy ra danh sách booking từ API với điều kiện filter
  });
  return { bookings, isLoading, count };
}
