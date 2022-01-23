import * as Parallel from "async-parallel"
import { prop } from "rambda"
import React from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"

import { Center, HStack, Progress, VStack } from "@chakra-ui/react"

import { useAppSelector as getState } from "../../../storeConfig"
import { toastOptions } from "../../apiErrors"
import AppToolTip from "../appTooltip"
import { DropArea, DropText, ProgressText, ProgressValue, UploadBox, UploadIcon } from "./styles"

let context = { current: "" }

const DropZone = ({ label, uploadMedia, updateUploadProgress }: any) => {
  const onDrop = (files: File[]) => {
    let done = 1
    context.current = label
    Parallel.map(
      files,
      async (file: any) => {
        if (done === 1) updateUploadProgress(1)
        if (done === files.length) updateUploadProgress(Math.floor((done / files.length) * 100) - 1)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("fullPath", file.name)
        const result = await uploadMedia({ label: context.current, formData, fileName: file.name })
        updateUploadProgress(Math.floor((done++ / files.length) * 100))
        if (done === files.length + 1) toast.success("File upload ended", toastOptions)

        return result
      },
      1,
    )
  }

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
  })

  const { uploadProgress } = getState(prop("mediaDisplay"))

  const isUploading = uploadProgress !== 0 && uploadProgress !== 100

  return (
    <Center>
      <AppToolTip tooltip="upload">
        <UploadBox spacing={3}>
          {isUploading && (
            <VStack spacing={0}>
              <ProgressText children={context.current} />
              <ProgressValue children={`${uploadProgress} %`} />
              <Progress w={140} size="xs" value={uploadProgress} />
            </VStack>
          )}
          <DropArea {...getRootProps({ accept: isDragAccept.toString(), uploading: isUploading.toString() })}>
            <HStack>
              <UploadIcon uploading={isUploading.toString()} />
              <DropText uploading={isUploading.toString()} children={"Upload"} />
            </HStack>
            <input {...getInputProps()} />
          </DropArea>
        </UploadBox>
      </AppToolTip>
    </Center>
  )
}

export default DropZone
