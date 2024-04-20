import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, deleteUser } from "../api/services/user.service";

const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export { useAddUser, useDeleteUser };
