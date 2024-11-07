import {Button, Modal} from 'antd'
import React, {Dispatch, SetStateAction, useState} from 'react'
import '../../assets/css/components/dashboard/theme-modal.scss'
import {useUserContext} from '../providers/UserProvider'

interface IModal {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  title?: string | null
  children: JSX.Element | JSX.Element[]
  formId?: string
  reloadTable?: any
  hideFooter?: boolean
}

export default function ThemeModal(options: IModal) {
  const [visible, setVisible] = useState<boolean>(options.active)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('Content of the modal')
  const [loading, setLoading] = useState(false)
  const showModal = () => {
    options.setActive(true)
  }

  const handleOk = async () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    if (options?.reloadTable) await options?.reloadTable()
  }

  const handleCancel = async () => {
    if (options?.reloadTable) await options?.reloadTable()
    options.setActive(false)
  }
  const {theme} = useUserContext()
  return (
    <>
      <Modal
        data-theme={theme}
        className={'hello'}
        title={options.title !== undefined ? options.title : 'title'}
        open={options.active}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={
          options?.hideFooter
            ? null
            : [
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                // <Button key="submit" type="primary" loading={loading} onClick={handleOk} form="hook-form">
                //     Submit
                // </Button>,
                <button
                  className={'ant-btn ant-btn-primary'}
                  onClick={handleOk}
                  type="submit"
                  form={options.formId}
                >
                  Save
                </button>,
              ]
        }
      >
        {options.children}
      </Modal>
    </>
  )
}
