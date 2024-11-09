import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CreateUserDTO, UserDTO } from "./models";

export const queryClient = new QueryClient()

export const createNewUser = (createUserDTO: CreateUserDTO) => {
    return axios.post('http://localhost:8000/api/user/', createUserDTO)
}

export const deleteUser = async (user_id: string) => {
    const response = await axios.delete(`http://localhost:8000/api/user/${user_id}/`)
    return response.data
}

export const getAllUsers = async () => {
    const response = await axios.get<UserDTO[]>('http://localhost:8000/api/user/')
    return response.data
}

export const useGetAllPlayersDetails = () => {
    return useQuery({
        queryKey: ['registered-users'],
        queryFn: () => getAllUsers()
    })
}