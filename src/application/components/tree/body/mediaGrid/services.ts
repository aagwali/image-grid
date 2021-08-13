import { baseMsApi } from "../../../../reducers"
import { MediumItem } from "../../../../types"
import { formatApiResult } from "./privates"
import { MediaGridEndpoints as Api } from "./types"

export const mediashareApi = baseMsApi.injectEndpoints({
  endpoints: (build) => ({
    [Api.GetMediaByContextLabel]: build.query<MediumItem[], string>({
      query: (label) => `context/${label}/media`,
      transformResponse: formatApiResult,
    }),
  }),
})

export const { useGetMediaByContextLabelQuery } = mediashareApi
