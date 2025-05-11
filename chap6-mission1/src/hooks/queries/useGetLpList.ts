import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpListDto } from "../../types/lp";


const initialLpListData:ResponseLpListDto = {

  status: true,
  statusCode: 200,
  message: "",
  data: {
    data:[]
  },
  nextCursor: 0,
  hasNext: false
}

function useGetLpList({cursor,search, order,limit}:PaginationDto) {

  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
        getLpList({
            cursor,
            search,
            order,
            limit,
        }),

        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분

       // enabled: Boolean(search),
      // refetchInterval: 100 * 60  // 10초
     //initialData: initialLpListData
    });
}

export default useGetLpList;