import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BuyPizzaRequestDTO, BuyPizzaResponseDTO, CreateUserDTO, LeaderboardResponse, LogPizzaRequestDTO, LogPizzaToGetResponseDTO, MessageResponseDTO, PijjaDetailed, UserDetailDTO, UserDTO, UserIDDTO } from "./models";

export const queryClient = new QueryClient()

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export const createNewUser = (createUserDTO: CreateUserDTO) => {
    return apiClient.post('user/', createUserDTO)
}

export const deleteUser = async (user_id: string) => {
    const response = await apiClient.delete(`user/${user_id}`)
    return response.data
}


export const getUserDetail = async (userId: string | undefined) => {
    const response = await apiClient.get<UserDetailDTO>(`user/${userId}`)
    return response.data
}

export const useGetPlayerDetails = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['user-details', userId],
        queryFn: () => getUserDetail(userId),
        staleTime: 10,
        refetchOnMount: true
    })
}

export const getAllUsers = async () => {
    const response = await apiClient.get<UserDTO[]>('user/')
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
    return (await apiClient.get<BuyPizzaResponseDTO>('pizza/buy/')).data;
}

export const buyPizza = async (request: BuyPizzaRequestDTO) => {
    const response = await apiClient.post<MessageResponseDTO>('pizza/buy/', request);
    return response.data
}

export const getPizzasAvailableToLog = async (request: UserIDDTO) => {
    const response = await apiClient.post<LogPizzaToGetResponseDTO>('pizza/log/get/', request);
    return response.data
}

export const logPizza = async (request: LogPizzaRequestDTO) => {
    const response = await apiClient.post('pizza/log/', request);
    return response.data
}

export const getHistory = async (user_id: string) => {
    return (await apiClient.get<PijjaDetailed[]>(`user/${user_id}/history`)).data;
}

export const getLeaderboardData = async () => {
    const response = await apiClient.get<LeaderboardResponse>("leaderboard/");
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

export const updateUserDetails = async(userId: string, userCreationDTO: CreateUserDTO) => {
    const response = await apiClient.post<MessageResponseDTO>(`user/${userId}`, userCreationDTO);
    return response.data;
}