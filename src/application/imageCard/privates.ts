import { ControlStatus, QualityStatus } from "../types"

export const getQualityLabel = (status: any): any => {
  if (status === QualityStatus.High) return "Good"
  if (status === QualityStatus.Medium) return "Medium"
  if (status === QualityStatus.Low) return "Low"
  if (status === QualityStatus.Manual) return "Check"

  return "Quality label error"
}

export const getControlLabel = (status: any): any => {
  if (status === ControlStatus.Validated) return "Validated"
  if (status === ControlStatus.Pending) return "Pending"

  return "Control label error"
}
