import { mediashareApi } from "../../../../services"
import { MediashareEndpoints } from "../../../../types"
import { mockContext } from "./privates"

export const contextEndpoints = mediashareApi.injectEndpoints({
  endpoints: (build) => ({
    [MediashareEndpoints.GetContextByLabel]: build.query<any, string>({
      // query: (label) => ({ url: `context/${label}`, cache: "no-cache" }),
      query: (label) => ({ url: ``, cache: "no-cache" }), // temporary fake url
      providesTags: ["Context"],
      transformResponse: mockContext, // temporary fake response
    }),
  }),
})

export const getContextByLabel = contextEndpoints.endpoints[MediashareEndpoints.GetContextByLabel]
