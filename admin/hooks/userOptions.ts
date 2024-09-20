import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/services/AuthApi";

export const userOptions = queryOptions({
  queryKey: ["currentUser"],
  queryFn: fetchCurrentUser,
});
