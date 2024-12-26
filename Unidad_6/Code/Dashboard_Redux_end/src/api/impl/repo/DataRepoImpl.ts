import DataDS from '@api/domain/ds/DataDS';

import {
  UserCreate,
  UserLoaderData,
  UserByIndexLoaderData,
} from '@customTypes/user';

class DataRepoImpl {
  constructor(private data: DataDS) {}

  async loadUsers(state?: string): Promise<UserLoaderData> {
    return await this.data.loadUsers(state);
  }

  async loadUserByIndex(index: number): Promise<UserByIndexLoaderData> {
    return await this.data.loadUserByIndex(index);
  }

  async saveUser(user: UserCreate): Promise<void> {
    return await this.data.saveUser(user);
  }

  async deleteUser(index: number): Promise<void> {
    return await this.data.deleteUser(index);
  }
}

export default DataRepoImpl;
