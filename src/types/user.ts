import { IMetaData } from "./common-types";

export interface IUserResponse {
  data: IUser;
  message: string;
}

export interface IUsersResponse {
  data: {
   allUsers: IUser[];
   meta: IMetaData
  }
  message: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  mobileNumber: number;
  email: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  updatedBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export interface IAuth {
  tokens: null | {
    accessToken: string;
    refreshToken: string;
  };
  data: null | IUser;
}

export type Auth = {
  auth: boolean;
  editor: string;
  publisher: string;
  userName: string;
  loading: boolean;
  error: string | null;
};

export interface ICreateUserPayload {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  mobileNumber: number;
  email: string;
  password: string;
}

export interface IUpdateUserPayload {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
}

export interface IUpdatePasswordPayload {
  oldPassword: string | undefined;
  newPassword: string | undefined;
}

export interface TUpdateUserPayload {
  _id: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
}


export interface IGetAllUsersPayload {
  q?: string;
  "filter[gender]"?:"FEMALE"|"MALE"
  page?: number;
  order?: string;
}
