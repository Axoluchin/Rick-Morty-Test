import Axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

export const useAxios = makeUseAxios({
    axios: Axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
    })
})

export class ApiRoutes {
    static characters = () => '/character'
    static episodes = () => '/episode'
    static characterById = (id: string) => `/characters/${id}`
}