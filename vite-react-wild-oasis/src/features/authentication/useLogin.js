import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuthentication";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLogining } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      toast.success("Login successfully");
      queryClient.setQueryData(["user"], user.user); // Sau khi login thanh cong, luu user vao cache de su dung
      navigate("/");
    },
    onError: () => {
      toast.error("Email or Password is not exists");
    },
  });
  return { login, isLogining };
}

export default useLogin;
