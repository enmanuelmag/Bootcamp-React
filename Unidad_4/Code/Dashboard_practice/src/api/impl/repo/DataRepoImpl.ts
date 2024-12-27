import DataDS from '@api/domain/ds/DataDS';
import {
  UserByIdLoaderDataType,
  UserCreateType,
  UserLoaderDataType,
} from '@customTypes/user';

class DataRepoImpl {
  private data: DataDS;

  constructor(data: DataDS) {
    this.data = data;
  }

  async loadUsers(state?: string): Promise<UserLoaderDataType> {
    return this.data.loadUsers(state);
  }

  async loadUserById(id: string): Promise<UserByIdLoaderDataType> {
    return this.data.loadUserById(id);
  }

  async saveUser(user: UserCreateType): Promise<void> {
    return this.data.saveUser(user);
  }

  async updateUser(id: string, user: UserCreateType): Promise<void> {
    return this.data.updateUser(id, user);
  }
}

export default DataRepoImpl;
