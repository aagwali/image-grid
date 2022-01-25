import { skipToken } from "@reduxjs/toolkit/dist/query"

import { Context, RawContext } from "../../../types"
import { getMediaByContextLabel } from "./medias/services"
import { getReferencesByContextLabel } from "./references/services"
import { getContextByLabel } from "./services"

export const toAppContext = (response: RawContext): Context => ({ id: response.id, label: response.label })

export const getContainerProps = (contextLabel: string) => {
  const { isFetching: getContextIsFetching } = getContextByLabel.useQuery(contextLabel ?? skipToken)
  const [getMedias, getMediasHook] = getMediaByContextLabel.useLazyQuery()
  const [getReferences, getReferencesHook] = getReferencesByContextLabel.useLazyQuery()

  return {
    contextLabel,
    getContextIsFetching,
    getMedias,
    getMediasHook,
    getReferences,
    getReferencesHook,
  }
}
