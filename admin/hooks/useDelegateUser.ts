import { useQuery } from "@tanstack/react-query";
import { getDelegateUsers } from "@/services/AuthApi";

export const useDelegateUser = () => {
  const { isPending, data: delegateUsers } = useQuery({
    queryKey: ["delegate-users"],
    queryFn: getDelegateUsers,
  });

  return { delegateUsers, isPending };
};
