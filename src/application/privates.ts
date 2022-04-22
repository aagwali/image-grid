import { ToastOptions } from "react-toastify"

import { theme } from "@chakra-ui/react"

export const getImageServerUrl = (id: string, size: number, whiteReplacement: boolean) => {
  const replaceColor = whiteReplacement ? "/rc:ffffff-FF0000/" : ""
  // return `${process.env.IMAGE_SERVER_MEDIA_URL}${replaceColor}/r:${size}x${size}/${process.env.MEDIASHARE_API_IMAGE_URL}/media/${id}/blob`

  // mocked image
  return `https://picsum.photos/id/${id}/${size}`
}

export const getHotkeys = (shortcuts: Record<string, string>): string =>
  Object.values(shortcuts).reduce((acc: any, val: any, index: number) => (index === 0 ? val : `${acc},${val}`), "")

export const toastOptions: ToastOptions = {
  position: "bottom-center",
  style: { textAlign: "center", fontWeight: theme.fontWeights.bold },
}
