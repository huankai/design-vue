import {pmsRequest} from "@/network/request";

export function queryForPage(queryPage) {
  return pmsRequest({
    method: "POST",
    data: queryPage,
    url: "/role/list"
  })

}
