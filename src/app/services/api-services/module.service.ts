// import {ITokenResponse, IVerifyLoginResponse} from '../../interfaces/IAuth.interfaces';
import {api} from './api.service'
import {IAuth} from '../../interfaces/IAuth'
import {IModules} from '../../interfaces/IModules'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'

export class ModuleService {
  private static storageKey = 'SE_AUTH_TOKEN'

  public static async login(data: IAuth): Promise<IAPIResponse> {
    const res = await api.post('login', data)
    this.setToken(res.data?.data?.access_token.token)
    console.log(`Token:`, this.getToken())
    return res.data as IAPIResponse
  }

  /**
   * This function will confirm that the user is logged in and if they are not will log them out and
   * redirect to the login screen
   * @returns IVerifyLoginResponse
   */
  public static async verifyLogin(): Promise<IAPIResponse> {
    try {
      const res = await api.get('me')
      return res.data as IAPIResponse
    } catch (exc) {
      this.logout()
      return Promise.reject()
    }
  }

  // Reset Password routes
  public static async sendEmail(email: string): Promise<boolean> {
    const res = await api.post('/api/auth/reset-password-email', {email})
    return res.data as any
  }

  public static async resetPassword(
    token: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const res = await api.post(`/api/auth/reset-password/${token}`, {email, password})
    return res.data as any
  }

  // Token Helpers
  public static getToken(): string | null {
    return localStorage.getItem(this.storageKey)
  }

  public static setToken(token: string | null): void {
    if (token) localStorage.setItem(this.storageKey, token)
    else localStorage.removeItem(this.storageKey)
  }

  public static logout() {
    this.setToken(null)
    window.location.assign(
      `/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`
    )
  }

  public static async index(): Promise<IPaginated<IModules[]>> {
    const res = await api.get('modules')
    return res.data.data as IPaginated<IModules[]>
  }
}
