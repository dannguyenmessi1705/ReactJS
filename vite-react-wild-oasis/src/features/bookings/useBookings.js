import { getBookings } from "../../services/apiBookings";

import { useQuery } from "@tanstack/react-query";

export default function useBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { bookings, isLoading };
}
