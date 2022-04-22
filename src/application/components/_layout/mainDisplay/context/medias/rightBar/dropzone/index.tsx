import { prop } from "rambda"
import React from "react"
import { useDropzone } from "react-dropzone"

import { Center, HStack, Progress, VStack } from "@chakra-ui/react"

import { useAppSelector as getState } from "../../../../../../../../storeConfig"
import ToolTip from "../../../../../../tooltip"
import { processUpload } from "./privates"
import { DropArea, DropText, ProgressText, ProgressValue, UploadBox, UploadIcon } from "./styles"

const uploadDisplayLabel = { current: "" }

const DropZone = ({ label, uploadMedia, updateUploadProgress }: any) => {
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop: processUpload(uploadDisplayLabel, label, updateUploadProgress, uploadMedia),
  })

  const { uploadProgress } = getState(prop("mediasDisplay"))

  const isUploading = uploadProgress !== 0 && uploadProgress !== 100

  return (
    <Center>
      <ToolTip tooltip="upload">
        <UploadBox spacing={3}>
          {isUploading && (
            <VStack spacing={0}>
              <ProgressText children={uploadDisplayLabel.current} />
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
      </ToolTip>
    </Center>
  )
}

export default DropZone
