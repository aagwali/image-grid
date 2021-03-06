import { QualityStatus } from "../../types"

export const getQualityBadge = (tootltipData: string): string => {
  if (tootltipData === QualityStatus.High) return "Image size is good"
  if (tootltipData === QualityStatus.Medium) return "Zoom deactivation is required"
  if (tootltipData === QualityStatus.Low) return "Image cannot be used"
  if (tootltipData === QualityStatus.Manual) return "Visual control is needed"
  if (tootltipData === "filename") return "Ctrl I"
  if (tootltipData === "badges") return "Ctrl B "
  if (tootltipData === "transparency") return "Ctrl Y"
  if (tootltipData === "clipping") return "Ctrl P"
  if (tootltipData === "zoom") return "Ctrl ↑ / Ctrl ↓"
  if (tootltipData === "selectAll") return "Ctrl A"
  if (tootltipData === "deselectAll") return "Ctrl D"
  if (tootltipData === "download media") return "Ctrl Shift D"
  if (tootltipData === "restore") return "Ctrl R"
  if (tootltipData === "pending") return "Quality has not been validated"
  if (tootltipData === "validated") return "Quality is validated"
  if (tootltipData === "upload") return "Clic or drop medias here to start upload"
  if (tootltipData === "dissociate content") return "Ctrl Alt D"
  return tootltipData
}
