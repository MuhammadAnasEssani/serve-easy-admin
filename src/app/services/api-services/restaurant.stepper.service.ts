import {api} from './api.service'
import {IAPIResponse} from '../../interfaces/ICommon'
import {IRestaurantStepper} from '../../interfaces/ISettings'

export class RestaurantStepperService {
  public static async store(data: IRestaurantStepper): Promise<IAPIResponse> {
    const res = await api.post('restaurant-steppers', data)
    return res.data as IAPIResponse
  }
}
