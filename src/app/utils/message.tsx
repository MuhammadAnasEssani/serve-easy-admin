import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'

export const success = (msg: any) =>
  toast.success(msg, {
    autoClose: 1500,
    theme: 'dark',
  })

export const error = (msg: any) =>
  toast.error(msg, {
    autoClose: 1500,
  })
