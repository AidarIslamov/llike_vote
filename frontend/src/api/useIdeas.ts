import { api } from "@/lib/axios";
import type { IdeasResponse } from "@/lib/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

function unitQueryOptions() {
  return queryOptions({
    queryKey: ['ideas'],
    queryFn: async (): Promise<IdeasResponse> =>{  
      const { data: {data, limitExceeded} } =  await api.get('idea')
      return {data, limitExceeded };
    },
  });
}



export function useIdeas() {
  return useQuery({
    ...unitQueryOptions()
  });
}