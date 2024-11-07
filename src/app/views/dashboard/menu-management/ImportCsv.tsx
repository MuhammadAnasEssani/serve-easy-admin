import React, {useState} from 'react'
import {InboxOutlined, LoadingOutlined} from '@ant-design/icons'
import type {UploadProps} from 'antd'
import {Spin, Upload} from 'antd'
import {toast} from 'react-toastify'

const {Dragger} = Upload
export default function ImportCsv({
  uploadCsv,
  loading,
}: {
  uploadCsv: (file: File) => void
  loading: boolean
}) {
  const antIcon = <LoadingOutlined style={{fontSize: 24, color: 'white'}} spin />
  const [file, setFile] = useState<File>()
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    // action: 't',
    onChange(info) {
      setFile(info.fileList[0].originFileObj)
      // console.log(info.file.originFileObj)
      // const { status } = info.file;
      // if (status !== 'uploading') {
      //     console.log(info.file, info.fileList);
      // }
      // if (status === 'done') {
      //     message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //     message.error(`${info.file.name} file upload failed.`);
      // }
    },
    // onDrop(e) {
    //     console.log('Dropped files', e.dataTransfer.files);
    // },
  }

  return (
    <>
      <div>
        <Dragger beforeUpload={() => false} {...props} maxCount={1} accept={'.csv'}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
        {loading ? (
          <button className={'mt-4 btn btn-primary btn-upload'} type={'button'}>
            {' '}
            <Spin indicator={antIcon} />
          </button>
        ) : (
          <button
            className={'mt-4 btn btn-primary btn-upload'}
            onClick={() => {
              if (file) {
                uploadCsv(file)
              } else {
                toast.error('File is Required')
              }
            }}
          >
            Upload{' '}
          </button>
        )}
      </div>
    </>
  )
}
