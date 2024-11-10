import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BuyPizzaRequestDTO, BuyPizzaResponseDTO, CreateUserDTO, LeaderboardResponse, LogPizzaRequestDTO, LogPizzaToGetResponseDTO, MessageResponseDTO, PijjaDetailed, UserDTO, UserIDDTO } from "./models";

export const queryClient = new QueryClient()

export const createNewUser = (createUserDTO: CreateUserDTO) => {
    return axios.post('http://localhost:8000/api/user/', createUserDTO)
}

export const deleteUser = async (user_id: string) => {
    const response = await axios.delete(`http://localhost:8000/api/user/${user_id}`)
    return response.data
}

export const getAllUsers = async () => {
    const response = await axios.get<UserDTO[]>('http://localhost:8000/api/user/')
    return response.data
}

export const useGetAllPlayersDetails = () => {
    
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: () => getAllUsers(),
        staleTime: 10,
        refetchOnMount: true
    })
}

export const getAvailablePizzasToBuy = async () => {
    return (await axios.get<BuyPizzaResponseDTO>('http://localhost:8000/api/pizza/buy/')).data;
}

export const buyPizza = async (request: BuyPizzaRequestDTO) => {
    const response = await axios.post<MessageResponseDTO>('http://localhost:8000/api/pizza/buy/', request);
    return response.data
}

export const getPizzasAvailableToLog = async (request: UserIDDTO) => {
    const response = await axios.post<LogPizzaToGetResponseDTO>('http://localhost:8000/api/pizza/log/get/', request);
    return response.data
}

export const logPizza = async (request: LogPizzaRequestDTO) => {
    const response = await axios.post('http://localhost:8000/api/pizza/log/', request);
    return response.data
}

export const getHistory = async (user_id: string) => {
    return (await axios.get<PijjaDetailed[]>(`http://localhost:8000/api/user/${user_id}/history`)).data;
}

export const getLeaderboardData = async () => {
    const response = await axios.get<LeaderboardResponse>("http://localhost:8000/api/leaderboard/");
    return response.data;
}

export const useLeaderboardData = () => {
    return useQuery({
        queryKey: ['leaderboard'],
        queryFn: () => getLeaderboardData(),
        refetchInterval: 4000,
        staleTime: 10,
        refetchOnMount: true
    })
}