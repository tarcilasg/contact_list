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

export interface IAdmin {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  adm: boolean;
}

export interface IAdminUpdate {
  full_name?: string;
  email?: string;
  password: string;
}
/* export interface IUser extends IUserRequest {
  id: string;
  createdAt: Date;
} */
