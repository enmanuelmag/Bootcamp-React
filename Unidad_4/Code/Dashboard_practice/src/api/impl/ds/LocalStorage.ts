import { v4 as uuid } from 'uuid';

import DataDS from '@api/domain/ds/DataDS';
import { UserCreateType, UserType } from '@customTypes/user';

const USER_KEY = 'users';

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

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

  async loadUserById(id: string) {
    try {
      await sleep();

      const users = this.getUsers();

      const user = users.find((user) => user.id === id);

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

      newUsers.unshift({
        ...user,
        id: uuid(),
        url: `https://avatar.iran.liara.run/public/boy?username=${user.name}`,
      });

      localStorage.setItem(USER_KEY, JSON.stringify(newUsers));
    } catch (error) {
      console.error(error);
      throw new Error('Error al guardar el usuario');
    }
  }

  async updateUser(id: string, user: UserCreateType) {
    try {
      await sleep();

      const users = this.getUsers();

      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new Error('Usuario no encontrado');
      }

      const userToUpdate = {
        ...users[userIndex],
        ...user,
      };

      users[userIndex] = userToUpdate;

      localStorage.setItem(USER_KEY, JSON.stringify(users));
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el usuario');
    }
  }
}

export default LocalStorageDS;
