export interface IUserRequest {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  createdAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAdminRequest {
  name: string;
  email: string;
  password: string;
}
export interface IAdmin {
  name: string;
  email: string;
  password: string;
  active: boolean;
  adm?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminUpdate {
  name?: string;
  email?: string;
  active?: boolean;
  password: string;
}
