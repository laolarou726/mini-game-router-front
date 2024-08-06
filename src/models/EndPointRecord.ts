export default interface EndPointRecord {
  id: string
  serviceName: string
  endPoint: string
  weight: number
  timeout: number
  isValid: boolean
}
