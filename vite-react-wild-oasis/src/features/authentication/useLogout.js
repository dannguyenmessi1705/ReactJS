import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLogingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      toast.success("Logout successfully");
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLogingOut };
}

export default useLogout;
