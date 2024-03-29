import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending: isUpdatingUser,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({user}) => {
      console.log(user);
      toast.success("Update your account successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("There was an error to update your account");
    },
  });

  return { updateUser, isUpdatingUser };
}

export default useUpdateUser;
