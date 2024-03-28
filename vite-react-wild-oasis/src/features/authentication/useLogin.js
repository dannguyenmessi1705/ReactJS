import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuthentication";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLogining } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: () => {
      toast.success("Login successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Email or Password is not exists");
    },
  });
  return { login, isLogining };
}

export default useLogin;
