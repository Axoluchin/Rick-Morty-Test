import Axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

export const useAxios = makeUseAxios({
    axios: Axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
    })
})

export class ApiRoutes {
    static characters = (number: number) => `/character?page=${number}`
    static episodes = () => '/episode'
    static characterById = (id: string) => `/characters/${id}`
    static episodeByID = (id: string) => `/episode/${id}`
}