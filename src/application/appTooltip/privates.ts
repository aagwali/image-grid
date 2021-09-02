import { QualityStatus } from "../types"

export const getQualityBadge = (tootltipData: string): string => {
  if (tootltipData === QualityStatus.High) return "Image size is good"
  if (tootltipData === QualityStatus.Medium) return "Zoom deactivation is required"
  if (tootltipData === QualityStatus.Low) return "Image cannot be used"
  if (tootltipData === "filename") return "Ctrl I"
  if (tootltipData === "badges") return "Ctrl B "
  if (tootltipData === "transparency") return "Ctrl Y"
  if (tootltipData === "zoom") return "Ctrl ↑ / Ctrl ↓"
  if (tootltipData === "selectAll") return "Ctrl A"
  if (tootltipData === "deselectAll") return "Ctrl D"
  // else
  return "Quality control is pending" // TODO calcul real pending
}
