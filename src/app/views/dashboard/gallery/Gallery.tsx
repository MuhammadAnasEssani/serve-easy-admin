import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../providers/UserProvider'
import {InboxOutlined} from '@ant-design/icons'
import type {UploadProps} from 'antd'
import {message, Skeleton, Upload} from 'antd'
import '../../../../assets/css/views/dashboard/gallery.scss'
import GalleryImage from './GalleryImage'
import ImageUpload from '../../../components/dashboard/ImageUpload'
import {useForm} from 'react-hook-form'
import {AttachmentServices} from '../../../services/api-services/attachment.services'
import {toast} from 'react-toastify'
import {BACKEND_CONSTANTS, GALLERY_PAGINATION} from '../../../config/constants'
import {IAttachmentListing} from '../../../interfaces/IAttachement'
import ThemeButton from '../../../components/dashboard/ThemeButton'

const {Dragger} = Upload

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const {status} = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

interface IMediaUpload {
  media: {
    path: string
  }[]
}

const content = (
  <div>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    {/* <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p> */}
  </div>
)

export default function Gallery() {
  const [images, setImages] = useState<IAttachmentListing[]>([])
  const [imageUpdate, setImageUpdate] = useState<boolean>(false)
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: GALLERY_PAGINATION.firstPage,
    per_page: GALLERY_PAGINATION.perPage,
  })
  const [loading, setLoading] = useState<boolean>(true)
  const {setTitle, establishmentId} = useUserContext()
  useEffect(() => {
    setTitle('Media Library')
  }, [])
  const methods = useForm<IMediaUpload>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  useEffect(() => {
    const media = methods.watch('media')
    if (media?.length > 0) {
      AttachmentServices.store({
        path: media[0].path || '',
        establishment_id: establishmentId,
      })
        .then(() => {
          setImageUpdate(!imageUpdate)
        })
        .catch((e) => {
          toast.error(e.message)
        })
    }
  }, [methods.watch('media')])

  const getImages = async () => {
    setLoading(true)
    const response = await AttachmentServices.index(
      {instance_type: BACKEND_CONSTANTS.ATTACHMENT_INSTANCE_TYPE.GALLERY},
      pagination.per_page,
      pagination.current_page
    )
    // if api call first time state will append only new record
    // otherwise state will append old & new records both
    if (response.data.meta.current_page > 1) {
      setImages([...images, ...response.data.data])
    } else {
      setImages([...response.data.data])
    }
    setPagination(response.data.meta)
    setLoading(false)
  }
  const handleLoadMore = () => {
    setPagination({
      ...pagination,
      current_page: pagination.current_page + 1,
    })
  }

  useEffect(() => {
    // getImages calling on changes of current page & upload new image
    getImages()
  }, [imageUpdate, pagination.current_page])

  const handleRemoved = (id: number) => {
    setImages(images.filter((image) => image.id !== id))
  }
  const loadMoreShouldShow = () => {
    return pagination.total > pagination.per_page * pagination.current_page
  }

  return (
    <ViewCard>
      <div className={'media-gallery'}>
        <div>
          <ImageUpload
            maxCount={10}
            setValue={methods.setValue}
            fieldName={'media'}
            body={content}
            autoHideAfterUpload={true}
          />
        </div>
        <div className={'mt-3'}>
          <ul>
            {images.map((image) => {
              return (
                image.mediaUrl && (
                  <li key={image.id}>
                    <GalleryImage
                      id={image.id}
                      path={image.path}
                      fullPath={image.mediaUrl}
                      handleRemoved={handleRemoved}
                    />
                  </li>
                )
              )
            })}
            {
              // show Image Loading Skeletons while api call in pending...
              loading && (
                <>
                  {/* Create an array of 15 length & fill empty object on all index
                                 then return skeleton on all iteration  with the help of map*/}
                  {Array(15)
                    .fill({})
                    .map((_, index) => (
                      <div key={index} className={'loader-item'}>
                        <Skeleton.Image active={true} />
                      </div>
                    ))}
                </>
              )
            }
          </ul>
        </div>
        {/* LoadMore button show only those case when total number of records less then fetched record */}
        {loadMoreShouldShow() && (
          <ThemeButton
            className={'pos-delete-btn red'}
            onClick={handleLoadMore}
            loader={loading}
            text={'Load More'}
          />
        )}
      </div>
    </ViewCard>
  )
}
