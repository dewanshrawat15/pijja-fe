import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BuyPizzaRequestDTO, BuyPizzaResponseDTO, CreateUserDTO, PurchasePizzaResponseDTO, UserDTO } from "./models";

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

export const getAvailablePizzasToBuy = async () => {
    return (await axios.get<BuyPizzaResponseDTO>('http://localhost:8000/api/pizza/buy/')).data;
}

export const buyPizza = async (request: BuyPizzaRequestDTO) => {
    const response = await axios.post<PurchasePizzaResponseDTO>('http://localhost:8000/api/pizza/buy/', request);
    return response.data
}