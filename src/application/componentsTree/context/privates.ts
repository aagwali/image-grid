import { skipToken } from "@reduxjs/toolkit/dist/query"

import { getContextByLabel, getMediaByContextLabel, getReferencesByContextLabel } from "../../services"

export const getContainerProps = (routeParams: any) => {
  const { contextLabel } = routeParams
  const { isFetching, error } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedia, useGetMedia] = getMediaByContextLabel.useLazyQuery()
  const [getReferences, useGetReferences] = getReferencesByContextLabel.useLazyQuery()

  return { contextLabel, isFetching, error, getMedia, useGetMedia, getReferences, useGetReferences }
}
