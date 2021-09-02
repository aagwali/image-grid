import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { formatApiResult } from "./privates"
import { MediaDisplayEndpoints, MediumItem } from "./types"

export const mediashareApi = createApi({
  reducerPath: "mediashare-queries",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MEDIASHARE_API_URL,
  }),
  keepUnusedDataFor: 0, // limit data cache to Context lifecycle
  endpoints: (build) => ({
    [MediaDisplayEndpoints.GetContextByLabel]: build.query<MediumItem[], string>({
      query: (label) => `context/${label}`,
    }),
    [MediaDisplayEndpoints.GetMediaByContextLabel]: build.query<MediumItem[], string>({
      query: (label) => `context/${label}/media`,
      transformResponse: formatApiResult,
    }),
  }),
})

export const getMediaByContextLabel = mediashareApi.endpoints[MediaDisplayEndpoints.GetMediaByContextLabel]
export const getContextByLabel = mediashareApi.endpoints[MediaDisplayEndpoints.GetContextByLabel]
