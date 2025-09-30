import { api } from "@/lib/axios";
import type { ApiRequestParams, Idea } from "@/lib/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

function unitQueryOptions({include}: ApiRequestParams) {
  return queryOptions({
    queryKey: ['ideas'],
    queryFn: async (): Promise<Idea[]> =>{  
      const { data } =  await api.get('idea', {
        params: {
          include: include ? include.join(',') : '',
        },
      })
      return data.data;
    },
  });
}


export function useIdeas(params?: ApiRequestParams ) {
  const { include = null } = params ?? {};
  return useQuery({
    ...unitQueryOptions({include})
  });
}