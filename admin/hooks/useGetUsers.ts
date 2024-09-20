import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/AuthApi";

export const useGetUsers = () => {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { users, isPending };
};
