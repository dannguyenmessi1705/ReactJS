import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isPending: isLoadingSignup } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi(email, password, fullName),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Signup successfully");
    },
  });
  return { signup, isLoadingSignup };
}

export default useSignup;
