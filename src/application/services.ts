import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { formatApiResult } from "./privates"
import { MediaGridEndpoints, MediumItem } from "./types"

export const mediashareApi = createApi({
  reducerPath: "msApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MEDIASHARE_API_URL,
  }),
  keepUnusedDataFor: 0, // limit data cache to Context lifecycle
  endpoints: (build) => ({
    [MediaGridEndpoints.GetContextByLabel]: build.query<MediumItem[], string>({
      query: (label) => `context/${label}`,
    }),
    [MediaGridEndpoints.GetMediaByContextLabel]: build.query<MediumItem[], string>({
      query: (label) => `context/${label}/media`,
      transformResponse: formatApiResult,
    }),
  }),
})

export const getMediaByContextLabel = mediashareApi.endpoints[MediaGridEndpoints.GetMediaByContextLabel]
export const getContextByLabel = mediashareApi.endpoints[MediaGridEndpoints.GetContextByLabel]
