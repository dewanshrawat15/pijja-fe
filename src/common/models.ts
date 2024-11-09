
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