
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