import DataDS from '@api/domain/ds/DataDS';
import { UserCreateType, UserType } from '@customTypes/user';

const USER_KEY = 'users';

const sleep = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

class LocalStorageDS extends DataDS {
  getUsers() {
    try {
      const usersRaw = localStorage.getItem(USER_KEY);

      return (usersRaw ? JSON.parse(usersRaw) : []) as UserType[];
    } catch (error) {
      console.error(error);
      throw new Error('Error al cargar los usuarios');
    }
  }

  async loadUsers(state?: string) {
    try {
      await sleep();

      const users = this.getUsers();

      if (state === 'verified') {
        return {
          users: users.filter((user) => user.verified),
        };
      }

      return {
        users,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error al cargar los usuarios');
    }
  }

  async loadUserByIndex(index: number) {
    try {
      await sleep();

      const users = this.getUsers();

      const user = users[index];

      return {
        user,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error al cargar el usuario');
    }
  }

  async saveUser(user: UserCreateType) {
    try {
      await sleep();

      const users = this.getUsers();

      const newUsers: UserType[] = users;

      newUsers.push({
        ...user,
        url: `https://avatar.iran.liara.run/public/boy?username=${user.name}`,
      });

      localStorage.setItem(USER_KEY, JSON.stringify(newUsers));
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar el usuario');
    }
  }

  async updateUser(index: number, user: UserCreateType) {
    try {
      await sleep();

      const users = this.getUsers();

      const newUsers: UserType[] = users;

      const userToUpdate = newUsers[index];

      newUsers[index] = {
        ...userToUpdate,
        ...user,
      };

      localStorage.setItem(USER_KEY, JSON.stringify(newUsers));
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el usuario');
    }
  }

  async deleteUser(index: number) {
    try {
      await sleep();

      const users = this.getUsers();

      const newUsers = users.filter((_, i) => i !== index);

      localStorage.setItem(USER_KEY, JSON.stringify(newUsers));
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar el usuario');
    }
  }
}

export default LocalStorageDS;
