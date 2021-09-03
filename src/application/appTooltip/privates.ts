import { QualityStatus } from "../types"

export const getQualityBadge = (tootltipData: string): string => {
  if (tootltipData === QualityStatus.High) return "Image size is good"
  if (tootltipData === QualityStatus.Medium) return "Zoom deactivation is required"
  if (tootltipData === QualityStatus.Low) return "Image cannot be used"
  if (tootltipData === QualityStatus.Manual) return "Visual control is needed"
  if (tootltipData === "filename") return "Ctrl I"
  if (tootltipData === "badges") return "Ctrl B "
  if (tootltipData === "transparency") return "Ctrl Y"
  if (tootltipData === "zoom") return "Ctrl ↑ / Ctrl ↓"
  if (tootltipData === "selectAll") return "Ctrl A"
  if (tootltipData === "deselectAll") return "Ctrl D"
  if (tootltipData === "download media") return "Ctrl Shift D"
  if (tootltipData === "trash") return "Ctrl X"
  if (tootltipData === "pending") return "No quality control"
  if (tootltipData === "validated") return "Quality control is done"
  return "Tooltip error"
}
