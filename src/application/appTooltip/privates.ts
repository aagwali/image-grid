import { QualityStatus } from "../types"

export const getQualityBadge = (tootltipData: string): string => {
  if (tootltipData === QualityStatus.High) return "Image size is good"
  if (tootltipData === QualityStatus.Medium) return "Zoom deactivation is required"
  if (tootltipData === QualityStatus.Low) return "Image cannot be used"
  if (tootltipData === "home") return "Navigate to home"
  if (tootltipData === "media") return "Navigate to media view"
  if (tootltipData === "article") return "Navigate to article view"
  if (tootltipData === "association") return "Navigate to association view"
  if (tootltipData === "trash") return "Navigate to media trashed view"
  // else is controlId
  return "Quality control is pending"
}
