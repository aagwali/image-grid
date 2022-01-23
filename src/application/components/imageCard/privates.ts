import { ControlStatus, QualityStatus } from "../../types"

export const getBadgeLabel = (status: any): any => {
  if (status === QualityStatus.High) return "Good"
  if (status === QualityStatus.Medium) return "Medium"
  if (status === QualityStatus.Low) return "Low"
  if (status === QualityStatus.Manual) return "Check"
  if (status === ControlStatus.Validated) return "Validated"
  if (status === ControlStatus.Pending) return "Pending"

  return "Badge label error"
}

export const getBoundedSize = (size: number, minBound: number): number => (size <= minBound ? minBound : size)
