import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export default function useBooking() {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // bình thường React Query sẽ fecth lại 3 lần kể từ lần lỗi đầu tiên, nhưng ta sẽ cho nó ngừng fetch khi gặp lỗi luôn để cải thiện hiệu suất
  });
  return { booking, isLoading };
}
