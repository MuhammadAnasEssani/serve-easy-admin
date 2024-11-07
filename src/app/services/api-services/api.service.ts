import axios from 'axios'
import { UserAuthService } from './user-auth-api.service'
import { toast } from 'react-toastify'

/**
 * This file doesn't do much. It's just a wrapper for axios that only exists to:
 * 1 - Set the base URL on axios from environment vars
 * 2 - Stuff the `Authorization` header in before a request goes out
 * 3 - Maybe other stuff later
 */

const AuthServices = require('./user-auth-api.service')
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

// Secondary usage of axios in case we need one without auth headers .. i.e. for login.
export const axiosService = axios

// Export our custom axios instance with auth headers added
export const api = axios.create({
  // baseURL: "/api",
  timeout: 60 * 1000,
})

api.interceptors.request.use(
  (config) => {
    let token = UserAuthService.getToken()
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        Scope: 'AP', //AP stands for Admin Panel, it is mainly used for getting all active and inactive records
      },
    }
  },
  (exc) => Promise.reject(exc)
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    console.error('Error', err)
    switch (err.response.status) {
      case 401:
        if (err.response.headers['x-auth-error'] === 'TokenExpired') {
          AuthServices.UserAuthService.logout()
        } else {
          toast.error(err.response.data.message)
        }
        break
      default:
        toast.error(err?.response?.data?.message || 'Something went wrong!')
    }

    return {
      data: {
        status: false,
        message: err.response.data.message,
        data: null,
      },
    }
  }
)
