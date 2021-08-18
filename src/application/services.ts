import { formatApiResult } from "./privates"
import { baseMsApi } from "./reducers"
import { MediaGridEndpoints, MediumItem } from "./types"

export const mediashareApi = baseMsApi.injectEndpoints({
  endpoints: (build) => ({
    [MediaGridEndpoints.GetMediaByContextLabel]: build.query<MediumItem[], string>({
      query: (label) => `context/${label}/media`,
      transformResponse: formatApiResult,
    }),
  }),
})

export const { useGetMediaByContextLabelQuery } = mediashareApi
