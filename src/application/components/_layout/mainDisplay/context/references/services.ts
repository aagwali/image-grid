import { mediashareApi } from "../../../../../services"
import { MediashareEndpoints, RawReference, ReferenceItem } from "../../../../../types"
import { mockReferences, paginatedToReferenceItem } from "./privates"

export const referencesEndpoints = mediashareApi.injectEndpoints({
  endpoints: (build) => ({
    [MediashareEndpoints.GetReferencesByContextLabel]: build.query<ReferenceItem[], string>({
      query: (label) => ({ url: ``, cache: "no-cache" }), // temporary fake url
      // query: (label) => ({ url: `context/${label}/references?page=1&size=50000`, cache: "no-cache" }),
      providesTags: ["References"],
      transformResponse: mockReferences, // temporary fake response
    }),

    [MediashareEndpoints.PatchReference]: build.mutation<
      ReferenceItem,
      { referenceIds: string[]; value: Partial<RawReference> }
    >({
      query: (payload) => ({
        url: `/references/bulk-patch`,
        method: "PATCH",
        body: payload,
        transformResponse: paginatedToReferenceItem,
      }),
    }),
  }),
})

export const getReferencesByContextLabel =
  referencesEndpoints.endpoints[MediashareEndpoints.GetReferencesByContextLabel]
export const triggerPatchReference = referencesEndpoints.endpoints[MediashareEndpoints.PatchReference]
