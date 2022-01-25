import { mediashareApi } from "../../../../services"
import { MediaItem, MediashareEndpoints } from "../../../../types"
import { toMediaItem } from "./privates"

export const mediasEndpoints = mediashareApi.injectEndpoints({
  endpoints: (build) => ({
    [MediashareEndpoints.GetMediaByContextLabel]: build.query<MediaItem[], string>({
      query: (label) => ({ url: `context/${label}/media`, cache: "no-cache" }),
      providesTags: ["Media"],
      transformResponse: toMediaItem,
    }),

    [MediashareEndpoints.PutInTrash]: build.mutation<MediaItem[], string[]>({
      query: (mediaIds) => ({
        url: `/media/bulk-trash`,
        method: "POST",
        body: mediaIds,
      }),
      invalidatesTags: (_, error) => (error ? ["Media"] : []),
    }),
    [MediashareEndpoints.RestoreFromTrash]: build.mutation<MediaItem[], string[]>({
      query: (mediaIds) => ({
        url: `/media/bulk-restore`,
        method: "POST",
        body: mediaIds,
      }),
      invalidatesTags: (_, error) => (error ? ["Media"] : []),
    }),
    [MediashareEndpoints.Upload]: build.mutation<MediaItem, { label: string; formData: FormData; fileName: string }>({
      query: ({ label, formData, fileName }) => ({
        url: `/context/${label}/upload`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
})

export const getMediaByContextLabel = mediasEndpoints.endpoints[MediashareEndpoints.GetMediaByContextLabel]
export const triggerTrashMedia = mediasEndpoints.endpoints[MediashareEndpoints.PutInTrash]
export const triggerRestoreMedia = mediasEndpoints.endpoints[MediashareEndpoints.RestoreFromTrash]
export const triggerUploadMedia = mediasEndpoints.endpoints[MediashareEndpoints.Upload]
