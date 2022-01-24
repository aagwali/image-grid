import { skipToken } from "@reduxjs/toolkit/dist/query"

import { getContextByLabel, getMediaByContextLabel, getReferencesByContextLabel } from "../../services"

export const getContainerProps = (contextLabel: string) => {
  const { isFetching } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedias, useGetMedias] = getMediaByContextLabel.useLazyQuery()
  const [getReferences, useGetReferences] = getReferencesByContextLabel.useLazyQuery()

  return {
    contextLabel,
    getContextIsFetching: isFetching,
    getMedias,
    getMediasHook: useGetMedias,
    getReferences,
    getReferencesHook: useGetReferences,
  }
}
