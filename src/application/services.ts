import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mediashareApi = createApi({
  reducerPath: "mediashareServer",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MEDIASHARE_API_URL,
  }),
  keepUnusedDataFor: 0,
  tagTypes: ["Context", "References", "Media"],
  endpoints: () => ({}),
})
