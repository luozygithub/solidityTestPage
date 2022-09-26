
import { get } from './http'
export const api1 = param => get('contractList', param)
export const getContractList = param => get('contractList', param)
export const getUserPurchase = param => get('miningList',param)
