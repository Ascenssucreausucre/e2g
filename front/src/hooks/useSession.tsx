// hooks/useSession.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSession } from "../api/auth";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
  });
}
