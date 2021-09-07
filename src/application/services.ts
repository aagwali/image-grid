import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { toAppContext, toMediumItem } from "./privates"
import { ContextEndpoints, MediumItem } from "./types"

export const mediashareApi = createApi({
  reducerPath: "mediashareServer",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MEDIASHARE_API_URL,
  }),
  keepUnusedDataFor: 0,
  tagTypes: ["Context", "References", "Media"],
  endpoints: (build) => ({
    [ContextEndpoints.GetContextByLabel]: build.query<any, string>({
      query: (label) => ({ url: `context/${label}`, cache: "no-cache" }),
      providesTags: ["Context"],
      transformResponse: toAppContext,
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
      invalidatesTags: (_, error) => (error ? ["Media"] : []),
    }),
    [ContextEndpoints.RestoreFromTrash]: build.mutation<any, string[]>({
      query: (mediumIds) => ({
        url: `/media/bulk-restore`,
        method: "POST",
        body: mediumIds,
      }),
      invalidatesTags: (_, error) => (error ? ["Media"] : []),
    }),
  }),
})

export const getContextByLabel = mediashareApi.endpoints[ContextEndpoints.GetContextByLabel]
export const getMediaByContextLabel = mediashareApi.endpoints[ContextEndpoints.GetMediaByContextLabel]
export const triggerTrashMedia = mediashareApi.endpoints[ContextEndpoints.PutInTrash]
export const triggerRestoreMedia = mediashareApi.endpoints[ContextEndpoints.RestoreFromTrash]
