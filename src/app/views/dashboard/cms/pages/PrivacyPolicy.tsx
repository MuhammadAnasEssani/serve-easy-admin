import React, {useEffect, useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Controller, useForm} from 'react-hook-form'
import './pages.scss'
import {useUserContext} from '../../../../providers/UserProvider'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {Col, Form, Row} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {IPages} from '../../../../interfaces/ICMS'
import {PagesServices} from '../../../../services/api-services/pages.service'
import {toast} from 'react-toastify'
import {BACKEND_CONSTANTS} from '../../../../config/constants'

export default function PrivacyPolicy() {
  const {establishmentId} = useUserContext()
  const [loader, setLoader] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const [page, setPage] = useState<IPages>()
  const navigator = useNavigate()
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: {errors},
    control,
  } = useForm<IPages>({
    mode: 'onChange',
  })

  const onSubmit = async (data: IPages) => {
    setSubmitLoader(true)
    const payload = {
      title: 'Privacy Policy',
      content: data.content,
      slug: BACKEND_CONSTANTS.PAGES.PRIVACY_POLICY,
    }
    const res = await PagesServices.store(payload)
    if (res.status) {
      toast.success(res.message)
    }
    setSubmitLoader(false)
    getPageData()
  }

  const getPageData = async () => {
    setLoader(true)
    const result = await PagesServices.getPageBySlug(BACKEND_CONSTANTS.PAGES.PRIVACY_POLICY)

    if (result.status && result.data) {
      const pageData = {
        content: result.data.content,
        title: result.data.title,
      }

      reset(pageData)
      setPage(result.data)
    }

    setLoader(false)
  }

  useEffect(() => {
    getPageData()
  }, [establishmentId])

  const modules = {
    toolbar: [
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{color: []}, {background: []}], // dropdown with defaults from theme
      // [{font: []}],
      // [{align: []}],
      ['clean'],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{script: 'sub'}, {script: 'super'}], // superscript/subscript
      [{indent: '-1'}, {indent: '+1'}], // outdent/indent
      [{direction: 'rtl'}], // text direction
      // other formatting options here
    ],
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className={'h-100'}>
          <Col md={12} className={'h-100'}>
            <div className={'quill-editor'}>
              <Controller
                name="content"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    modules={modules}
                    theme={'snow'}
                  />
                )}
              />
            </div>
          </Col>
        </Row>

        <div className={'button-section'}>
          <ThemeButton
            onClick={() => navigator(-1)}
            type={'button'}
            className={'form-cancel'}
            text={'Cancel'}
          />
          <ThemeButton
            loader={submitLoader}
            type={'submit'}
            className={'form-create'}
            text={page ? 'Save' : 'Create'}
          />
        </div>
      </Form>
    </>
  )
}
