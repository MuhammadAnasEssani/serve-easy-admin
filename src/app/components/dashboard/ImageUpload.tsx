import {Modal, Upload, UploadProps, message} from 'antd'
import type {RcFile, UploadFile} from 'antd/es/upload/interface'
import React, {useEffect, useState} from 'react'
import {UseFormGetValues, UseFormSetValue} from 'react-hook-form/dist/types/form'
import AWS from 'aws-sdk'
import {BACKEND_CONSTANTS} from '../../config/constants'
import ImgCrop from 'antd-img-crop'
import '../../../assets/css/components/image-upload.scss'
import {fileToBase64} from '../../services/helper/base'
import {toast} from 'react-toastify'

interface IUploadBox {
  maxCount: number
  setValue: UseFormSetValue<any>
  getValues?: UseFormGetValues<any>
  fieldName: string
  body?: any
  autoHideAfterUpload?: boolean
  aspect?: number
  disabled?: boolean
  value?: any
  label?: string
  errors?: any
}
interface previewImage {
  image: string
  titie: string
  isOpen: boolean
}

export default function ImageUpload({
  maxCount,
  setValue,
  fieldName,
  body,
  autoHideAfterUpload,
  aspect,
  disabled,
  value,
  getValues,
  label,
  errors,
}: IUploadBox) {
  const defaultPreviewImage = {
    image: '',
    titie: '',
    isOpen: false,
  }
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<previewImage>(defaultPreviewImage)
  useEffect(() => {
    if (errors) {
      setError(errors.message)
    }
  }, [errors])

  const onChange: UploadProps['onChange'] = async (info) => {
    setError(null)
    if (info.file.status === 'uploading') {
      setFileList(info.fileList)
    }

    if (info.file.status === 'done') {
      setFileList(info.fileList)
      if (autoHideAfterUpload) {
        setTimeout(function () {
          setFileList(fileList.filter((file) => file.uid !== info.file.uid))
        }, 1000)
      }
    }

    if (info.file.status === 'removed') {
      setFileList(info.fileList)
      setValue(
        fieldName,
        getValues?.(fieldName)?.filter((item: any) => item.uid !== info.file.uid)
      )
    }
  }

  const uploadFiles = async (options: any) => {
    const {action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials} =
      options
    const newFileName = `${new Date().getTime()}${file.name}`
    const fileSize = file.size

    if (fileSize > parseInt(BACKEND_CONSTANTS.S3CREDENTIAL.fileSize, 10)) {
      setFileList([])
      setError('File size exceeded!')
      return false
    }

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
    })

    const S3 = new AWS.S3({region: process.env.REACT_APP_S3_REGION})
    const objParams = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME || '',
      Key: process.env.REACT_APP_S3_DIRECTORY + '/' + newFileName,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type, // TODO: You should set content-type because AWS SDK will not automatically set file MIME
    }

    S3.putObject(objParams)
      .on('httpUploadProgress', function ({loaded, total}: {loaded: any; total: any}) {
        onProgress(
          {
            percent: Math.round((loaded / total) * 100),
          },
          file
        )
      })
      .send(function (err: any, data: any) {
        if (err) {
          onError()
          console.log(err.code)
          console.log(err.message)
          setFileList([])
        } else {
          onSuccess('Ok', file)
          if (maxCount > 1 && Array.isArray(value) && getValues && getValues(fieldName)) {
            /*
             * For multiple images - Has Many relationship
             * */

            setValue(fieldName, [
              ...getValues(fieldName),
              {
                path: `${objParams.Key}`,
                uid: file.uid,
              },
            ])
          } else {
            /*
             * For single image - HasOne relationship
             * */
            setValue(fieldName, [
              {
                path: `${objParams.Key}`,
                uid: file.uid,
              },
            ])
          }
        }
      })
  }

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await fileToBase64(file.originFileObj as RcFile)
    }
    setPreviewImage({
      image: file.url || (file.preview as string),
      titie: file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
      isOpen: true,
    })
  }
  const onPreviewCancel = () => {
    setPreviewImage({
      image: '',
      titie: '',
      isOpen: false,
    })
  }

  useEffect(() => {
    if (maxCount > 1 && Array.isArray(value)) {
      /*
       * For multiple images - Has Many relationship
       * */
      // debugger
      const fileListStructure: UploadFile[] = []
      for (let v of value) {
        fileListStructure.push({
          uid: `-${v.id}`,
          name: '',
          status: 'done',
          url: v.mediaUrl,
        })
      }
      setFileList(fileListStructure)
    } else {
      /*
       * For single image - HasOne relationship
       * */
      if (typeof value === 'string') {
        setFileList([
          {
            uid: '-1',
            name: '',
            status: 'done',
            url: value,
          },
        ])
      }
    }
  }, [value?.length])

  const beforeCrop = (file: RcFile) => {
    const isImage = file.type.startsWith('image')
    if (!isImage) {
      toast.error('You can only upload image files!')
    }
    return isImage
  }

  return (
    <div className={'image-upload'}>
      {label && <label>{label ? label : 'Upload Image'}</label>}
      <ImgCrop beforeCrop={beforeCrop} rotate aspect={aspect ? aspect : 1 / 1}>
        <Upload
          accept="image/*"
          customRequest={uploadFiles}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={maxCount}
          multiple={false}
          disabled={disabled}
        >
          {body ? body : fileList.length < maxCount && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal
        transitionName={''}
        open={previewImage.isOpen}
        title={previewImage.titie}
        footer={null}
        onCancel={onPreviewCancel}
      >
        <img alt="Preview-image" className={'image-preview'} src={previewImage.image} />
      </Modal>
      <small className={'error-message'}>{error}</small>
    </div>
  )
}
