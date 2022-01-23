import * as Parallel from "async-parallel"
import { toast } from "react-toastify"

import { toastOptions } from "../../../../../apiErrors"

export const processUpload =
  (uploadDisplayLabel: { current: string }, label: any, updateUploadProgress: any, uploadMedia: any) =>
  (files: File[]) => {
    let done = 1
    uploadDisplayLabel.current = label
    Parallel.map(
      files,
      async (file: any) => {
        if (done === 1) updateUploadProgress(1)
        if (done === files.length) updateUploadProgress(Math.floor((done / files.length) * 100) - 1)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("fullPath", file.name)
        const result = await uploadMedia({ label: uploadDisplayLabel.current, formData, fileName: file.name })
        updateUploadProgress(Math.floor((done++ / files.length) * 100))
        if (done === files.length + 1) toast.success("File upload ended", toastOptions)

        return result
      },
      1,
    )
  }
