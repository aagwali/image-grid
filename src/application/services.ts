import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { toMediumItem } from "./privates"
import { ContextEndpoints, MediumItem } from "./types"

export const mediashareApi = createApi({
  reducerPath: "mediashareServer",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MEDIASHARE_API_URL,
  }),
  keepUnusedDataFor: 0, // limit data cache to Context component lifecycle
  tagTypes: ["Context", "References", "Media"],
  endpoints: (build) => ({
    [ContextEndpoints.GetContextByLabel]: build.query<any, string>({
      query: (label) => ({ url: `context/${label}`, cache: "no-cache" }),
      providesTags: ["Context"],
    }),
    [ContextEndpoints.GetMediaByContextLabel]: build.query<MediumItem[], string>({
      query: (label) => ({ url: `context/${label}/media`, cache: "no-cache" }),
      providesTags: ["Media"],
      transformResponse: toMediumItem,
    }),
    [ContextEndpoints.PutInTrash]: build.mutation<MediumItem[], string[]>({
      query: (mediumIds) => ({
        url: `/media/bulk-trash`,
        method: "POST",
        body: mediumIds,
      }),
      invalidatesTags: ["Media"],
    }),
    [ContextEndpoints.PostDownloadMedia]: build.mutation<any, string[]>({
      query: (mediumIds) => ({
        url: `/media/download`,
        method: "POST",
        body: mediumIds,
      }),
    }),
  }),
})

export const getMediaByContextLabel = mediashareApi.endpoints[ContextEndpoints.GetMediaByContextLabel]
export const getContextByLabel = mediashareApi.endpoints[ContextEndpoints.GetContextByLabel]
export const triggerDownloadMedia = mediashareApi.endpoints[ContextEndpoints.PostDownloadMedia]
export const triggerTrashMedia = mediashareApi.endpoints[ContextEndpoints.PutInTrash]
