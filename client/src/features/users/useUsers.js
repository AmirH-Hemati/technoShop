import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export function useUsers() {
  const filters = [];
  const sort = [];
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ filters, sort }),
  });

  return { users, isLoading };
}
