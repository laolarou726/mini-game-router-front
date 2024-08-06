import axios from 'axios'
import EndPointRecord from "@/models/EndPointRecord";
import {HealthCheckEntry} from "@/models/HealthCheckEntry";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ADDR ?? 'http://127.0.0.1:5011',
})

export async function getEndPointListAsync() {
  const response = await axiosClient.get<EndPointRecord[]>('/EndPoint/list/all')

  if (response.status !== 200) {
    console.error('Failed to get end point list')
    return []
  }

  return response.data
}

export async function getHealthCheckListAsync() {
  const response = await axiosClient.get<Record<string, HealthCheckEntry>>('/HealthCheck/status')

  if (response.status !== 200) {
    console.error('Failed to get health check list')
    return []
  }

  return response.data
}
