import { HealthCheckHistory } from '@/models/HealthCheckHistory'

export interface HealthCheckEntry {
  serviceName: string
  endPoint: string
  averageStatus: number
  lastCheckUtc: string
  checkHistories: HealthCheckHistory[]
}
