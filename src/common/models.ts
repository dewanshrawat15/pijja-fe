
export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    NONE = 'NONE',
}

export interface CreateUserDTO {
    user_name: string;
    age: number;
    gender: GENDER;
}

export interface UserDTO extends CreateUserDTO {
    user_id: string;
    wallet_amount: number;
}


export interface BuyPizzaResponseDTO {
    pizzas: Pizza[];
    message: string;
}
  
export interface Pizza {
    pijja_id: string;
    price: number;
    name: string;
}

export interface BuyPizzaRequestDTO {
    user_id: string;
    pijja_id: string;
}

export interface PurchasePizzaResponseDTO {
    message: string;
}

export interface UserIDDTO {
    user_id: string;
}

export interface LogPizzaToGetResponseDTO {
    message: string;
    pijjas: Pizza[];
}

export interface LogPizzaRequestDTO {
    pijja_id: string;
    user_id: string;
}

export interface MessageResponseDTO {
    message: string;
}

export interface PijjaDetailed extends Pizza {
    last_modified_at: number;
}

export interface LeaderboardUser {
    name: string;
    rank: number;
    pizzas: LeaderboardPijja[];
}

export interface LeaderboardPijja {
    name: string;
    timestamp: number;
}

export interface LeaderboardResponse {
    [userId: string]: LeaderboardUser; 
}