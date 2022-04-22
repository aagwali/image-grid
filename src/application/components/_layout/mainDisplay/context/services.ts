import { mediashareApi } from "../../../../services"
import { MediashareEndpoints } from "../../../../types"
import { toAppContext } from "./privates"

export const contextEndpoints = mediashareApi.injectEndpoints({
  endpoints: (build) => ({
    [MediashareEndpoints.GetContextByLabel]: build.query<any, string>({
      query: (label) => ({ url: `context/${label}`, cache: "no-cache" }),
      providesTags: ["Context"],
      transformResponse: toAppContext,
    }),
  }),
})

export const getContextByLabel = contextEndpoints.endpoints[MediashareEndpoints.GetContextByLabel]
