import {
  UserCreateType,
  UserLoaderDataType,
  UserByIndexLoaderDataType,
} from '@customTypes/user';

abstract class DataDS {
  abstract loadUsers(state?: string): Promise<UserLoaderDataType>;

  abstract loadUserByIndex(index: number): Promise<UserByIndexLoaderDataType>;

  abstract saveUser(user: UserCreateType): Promise<void>;

  abstract updateUser(index: number, user: UserCreateType): Promise<void>;

  abstract deleteUser(index: number): Promise<void>;
}

export default DataDS;
