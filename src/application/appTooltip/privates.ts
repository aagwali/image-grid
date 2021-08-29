import { QualityStatus } from "../types"

export const getQualityBadge = (status: string): string => {
  if (status === QualityStatus.High) return "Image size is good"
  if (status === QualityStatus.Medium) return "Zoom deactivation is required"
  if (status === QualityStatus.Low) return "Image cannot be used"
  // else is controlId
  return "Quality control is pending"
}
