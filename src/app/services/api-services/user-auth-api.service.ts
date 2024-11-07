// import {ITokenResponse, IVerifyLoginResponse} from '../../interfaces/IAuth.interfaces';
import { api } from './api.service'
import { IAuth, IProfile, IUserLogin, IVerifyUser } from '../../interfaces/IAuth'
import { IAPIResponse, IPaginated } from '../../interfaces/ICommon'
import {
  IGetRestaurantOwner,
  IRegisterRestaurantOwner,
  IUpdateRestaurantOwner,
  IUser,
  IUserAdminPanelRegistration,
  IUserAdminPanelUpdate,
} from '../../interfaces/IUser'
import { PAGINATION } from '../../config/constants'
import { IAccountPasswordReset, IProfileUpdate } from '../../interfaces/IProfile'

export class UserAuthService {
  private static storageKey = 'SE_AUTH_TOKEN'
  private static userStorageKey = 'SE_USER_OBJECT'
  private static unVerifiedEmailKey = "UNVERIFIED_EMAIL";

  public static async login(data: IAuth): Promise<IAPIResponse<IUserLogin>> {
    const res = await api.post('login', data)
    if (res.data?.data?.user.is_verified) {
      this.setToken(res.data?.data?.access_token.token)
    } else {
      localStorage.setItem(this.unVerifiedEmailKey, res.data?.data?.user?.email)
    }
    return res.data as IAPIResponse<IUserLogin>
  }

  public static async superAdminlogin(data: IAuth): Promise<IAPIResponse<IUserLogin>> {
    const res = await api.post('super-admin-login', data)
    this.setToken(res.data?.data?.access_token.token)
    return res.data as IAPIResponse<IUserLogin>
  }

  public static async verifyOTP(otp_code: string): Promise<IAPIResponse<IUserLogin>> {
    let payload: IVerifyUser = {
      email: localStorage.getItem(this.unVerifiedEmailKey) || "",
      otp_code
    }
    const res = await api.post('verify-otp', payload);
    if (res.data?.status) {
      this.setToken(res.data?.data?.access_token.token)
      localStorage.removeItem(this.unVerifiedEmailKey)
    }
    return res.data as IAPIResponse<IUserLogin>
  }

  public static async resendOTP(email?: string): Promise<IAPIResponse<IUserLogin>> {
    let payload = {
      email: localStorage.getItem(this.unVerifiedEmailKey) || email
    }
    const res = await api.post('resend-otp', payload);
    return res.data as IAPIResponse<IUserLogin>
  }

  /**
   * This function will confirm that the user is logged in and if they are not will log them out and
   * redirect to the login screen
   * @returns IVerifyLoginResponse
   */

  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IUser[]>>> {
    const res = await api.get('get-restaurant-users', {
      params: { 'per-page': perPage, page, ...params },
    })
    return res.data as IAPIResponse<IPaginated<IUser[]>>
  }

  public static async getAdmins(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IUser[]>>> {
    const res = await api.get('get-restaurant-admins', {
      params: { 'per-page': perPage, page, ...params },
    })
    return res.data as IAPIResponse<IPaginated<IUser[]>>
  }

  public static async getRestaurantAdmin(
    id: string | undefined
  ): Promise<IAPIResponse<IGetRestaurantOwner>> {
    const res = await api.get(`get-single-restaurant-admin/${id}`)
    return res.data as IAPIResponse<IGetRestaurantOwner>
  }

  public static async getById(id: string | undefined): Promise<IAPIResponse<IUser>> {
    const res = await api.get(`users/${id}`)
    return res.data as IAPIResponse<IUser>
  }

  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`users/${id}`)
    return res.data as IAPIResponse<any>
  }

  public static async getUser(): Promise<IAPIResponse<IProfile>> {
    const res = await api.get('me')
    return res.data as Promise<IAPIResponse<IProfile>>
  }

  // Reset Password routes
  public static async sendEmail(email: string): Promise<boolean> {
    const res = await api.post('/api/auth/reset-password-email', { email })
    return res.data as any
  }

  public static async resetPassword(
    token: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const res = await api.post(`/api/auth/reset-password/${token}`, { email, password })
    return res.data as any
  }

  // Token Helpers
  public static getToken(): string | null {
    return localStorage.getItem(this.storageKey)
  }

  public static isAuthenticated = (): boolean => {
    /*todo: Do Expiry check from token*/
    return !!this.getToken()
  }

  public static setToken(token: string | null): void {
    if (token) localStorage.setItem(this.storageKey, token)
    else localStorage.removeItem(this.storageKey)
  }

  public static logout() {
    this.setToken(null)
    localStorage.removeItem('establishmentId')
    window.location.assign(
      `/?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`
    )
  }
  public static async registerUser(data: IUserAdminPanelRegistration): Promise<IAPIResponse<any>> {
    const res = await api.post('register', data)
    return res.data as IAPIResponse<any>
  }

  public static async registerRestaurantAdmin(
    data: IRegisterRestaurantOwner
  ): Promise<IAPIResponse<any>> {
    const res = await api.post('register-restaurant-admin', data)
    return res.data as IAPIResponse<any>
  }

  public static async updateUser(
    id: string | undefined,
    data: IUserAdminPanelUpdate
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`users/${id}`, data)
    return res.data as IAPIResponse<any>
  }

  public static async updateRestaurantAdmin(
    id: string | undefined,
    data: IUpdateRestaurantOwner
  ): Promise<IAPIResponse<any>> {
    const res = await api.patch(`update-restaurant-admin/${id}`, data)
    return res.data as IAPIResponse<any>
  }

  public static async updateProfile(payload: IProfileUpdate): Promise<IAPIResponse<any>> {
    const res = await api.post('update-profile', payload)
    return res.data as IAPIResponse<any>
  }
  public static async changePassword(payload: IAccountPasswordReset): Promise<IAPIResponse<any>> {
    const res = await api.post('change-password', payload)
    return res.data as IAPIResponse<any>
  }
}
