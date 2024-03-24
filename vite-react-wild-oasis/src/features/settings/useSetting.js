import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";
function useSetting() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, settings };
}

export default useSetting;
