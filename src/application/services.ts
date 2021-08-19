import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { formatApiResult } from "./privates"
import { MediaGridEndpoints, MediumItem } from "./types"

export const mediashareApi = createApi({
  reducerPath: "msApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MEDIASHARE_API_URL,
  }),
  endpoints: (build) => ({
    [MediaGridEndpoints.GetMediaByContextLabel]: build.query<MediumItem[], string>({
      query: (label) => `context/${label}/media`,
      transformResponse: formatApiResult,
    }),
  }),
})

export const { useGetMediaByContextLabelQuery } = mediashareApi
