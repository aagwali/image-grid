import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { formatGetMediaResult } from "./privates"
import { MediaDisplayEndpoints, MediumItem } from "./types"

export const mediashareApi = createApi({
  reducerPath: "mediashareServer",
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
      transformResponse: formatGetMediaResult,
    }),
    [MediaDisplayEndpoints.PostDownloadMedia]: build.mutation<any, string[]>({
      query: (mediumIds) => ({
        url: `/media/download`,
        method: "POST",
        body: mediumIds,
      }),
    }),
  }),
})

export const getMediaByContextLabel = mediashareApi.endpoints[MediaDisplayEndpoints.GetMediaByContextLabel]
export const getContextByLabel = mediashareApi.endpoints[MediaDisplayEndpoints.GetContextByLabel]
export const triggerDownloadMedia = mediashareApi.endpoints[MediaDisplayEndpoints.PostDownloadMedia]
