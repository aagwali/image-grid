import { parse, ParseOptions, stringify } from "query-string"
import { omit } from "rambda"

const routerParseOptions = { arrayFormat: "separator", arrayFormatSeparator: "|" } as ParseOptions

export const navigateWithFilter = (page: string, lastMediaFilter: string = "") => {
  const newQueryParameters = stringify(omit("bin", parse(lastMediaFilter, routerParseOptions)), routerParseOptions)
  const token = newQueryParameters === "" ? "" : "&"

  if (page === "medias") return `${page}?${newQueryParameters}`
  if (page === "bin") return `medias?${newQueryParameters}${token}bin=true`
  if (page === "references") return `${page}`

  return "navigationError"
}
