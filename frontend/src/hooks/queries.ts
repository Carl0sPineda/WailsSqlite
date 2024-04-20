import { useQuery } from "@tanstack/react-query";
import { allUsers, generatePassword } from "../api/services/user.service";

const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: allUsers,
  });
};

const useGeneratePassword = () => {
  return useQuery({
    queryKey: ["generate"],
    queryFn: generatePassword,
  });
};

export { useGetUsers, useGeneratePassword };
