// import {ITokenResponse, IVerifyLoginResponse} from '../../interfaces/IAuth.interfaces';
import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {PAGINATION} from '../../config/constants'
import {
  ICategory,
  ICategoryCreate,
  IMenu,
  IMenuCreateProduct,
  IProductList,
} from '../../interfaces/IMenu'

export class MenuServices {
  // public static async store(data:IMenu): Promise<IAPIResponse<any>> {
  //   const res = await api.post('roles', data)
  //   return res.data as IAPIResponse<any>;
  // }

  public static async getCategories(
    category_id: number | null,
    pagination = true,
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IMenu[]>>> {
    const res = await api.get(`categories`, {params: {category_id, pagination, ...params}})
    return res.data as IAPIResponse<IPaginated<IMenu[]>>
  }

  public static async uploadBulkCategories(data: FormData): Promise<IAPIResponse<any>> {
    const res = await api.post(`upload-bulk-categories`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data as IAPIResponse<any>
  }

  public static async uploadBulkProducts(data: FormData): Promise<IAPIResponse<any>> {
    const res = await api.post(`upload-bulk-products`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data as IAPIResponse<any>
  }

  public static async getAllCategories(
    category_id: number | null,
    params?: any,
    pagination = false,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IMenu[]>> {
    const res = await api.get(`categories`, {params: {category_id, pagination, ...params}})
    return res.data as IAPIResponse<IMenu[]>
  }

  public static async getProducts(
    category_id: number | null,
    pagination = true,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<IMenu[]>>> {
    const res = await api.get(`products`, {params: {category_id, pagination}})
    return res.data as IAPIResponse<IPaginated<IMenu[]>>
  }

  public static async getAllProducts(
    category_id: number | null,
    params?: any,
    pagination = false,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IProductList[]>> {
    const res = await api.get(`products`, {params: {category_id, pagination, ...params}})
    return res.data as IAPIResponse<IProductList[]>
  }

  public static async getSingleCategory(
    id: string | undefined | number
  ): Promise<IAPIResponse<ICategory>> {
    const res = await api.get(`categories/${id}`)
    return res.data as IAPIResponse<ICategory>
  }

  public static async getSingleProduct(
    id: string | undefined
  ): Promise<IAPIResponse<IProductList>> {
    const res = await api.get(`products/${id}`)
    return res.data as IAPIResponse<IProductList>
  }

  public static async createProduct(formData: IMenuCreateProduct): Promise<IAPIResponse<any>> {
    const res = await api.post(`products`, formData)
    return res.data as IAPIResponse<any>
  }

  public static async createCategory(formData: ICategoryCreate): Promise<IAPIResponse<any>> {
    const res = await api.post(`categories`, formData)
    return res.data as IAPIResponse<any>
  }
  public static async updateCategory(
    id: number,
    data: ICategoryCreate
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`categories/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async deleteProduct(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`products/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async deleteCategory(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`categories/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async updateProduct(
    id: string | undefined,
    data: IMenuCreateProduct
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`products/${id}`, data)
    return res.data as IAPIResponse<any>
  }
}
