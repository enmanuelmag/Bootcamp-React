import {
  UserCreateType,
  UserLoaderDataType,
  UserByIdLoaderDataType,
} from '@customTypes/user';

abstract class DataDS {
  abstract loadUsers(state?: string): Promise<UserLoaderDataType>;

  abstract loadUserById(id: string): Promise<UserByIdLoaderDataType>;

  abstract saveUser(user: UserCreateType): Promise<void>;

  abstract updateUser(id: string, user: UserCreateType): Promise<void>;

  abstract deleteUser(id: string): Promise<void>;
}

export default DataDS;
