import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useIdeas() {
  return useQuery({
    queryKey: ['places'],
    queryFn: async () => {
      const {
        data: { data, meta, links },
      } = await api.get('/idea');
      return {
        data,
        links,
        meta,
      };
    },
    retry: false,
  });
}