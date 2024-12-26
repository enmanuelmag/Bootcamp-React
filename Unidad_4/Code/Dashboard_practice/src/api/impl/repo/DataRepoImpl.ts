import DataDS from '@api/domain/ds/DataDS';
import {
  UserByIndexLoaderDataType,
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

  async loadUserByIndex(index: number): Promise<UserByIndexLoaderDataType> {
    return this.data.loadUserByIndex(index);
  }

  async saveUser(user: UserCreateType): Promise<void> {
    return this.data.saveUser(user);
  }
}

export default DataRepoImpl;
