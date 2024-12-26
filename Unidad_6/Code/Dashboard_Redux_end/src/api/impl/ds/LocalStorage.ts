import DataDS from '@api/domain/ds/DataDS';
import { User, UserCreate } from '@customTypes/user';

const USERS_KEY = 'users';

const sleep = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

class LocalStorageDS implements DataDS {
  async loadUsers(state?: string) {
    try {
      await sleep();

      const usersRaw = localStorage.getItem(USERS_KEY) ?? '[]';

      const users = JSON.parse(usersRaw) as User[];

      return {
        users: users.filter((user) =>
          state === 'verified' ? user.verified : true
        ),
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error loading users');
    }
  }

  async loadUserByIndex(index: number) {
    try {
      await sleep();

      const usersRaw = localStorage.getItem(USERS_KEY) ?? '[]';

      const users = JSON.parse(usersRaw) as User[];

      return {
        user: users[index],
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error loading user');
    }
  }

  async saveUser(user: UserCreate) {
    try {
      await sleep();

      const usersRaw = localStorage.getItem(USERS_KEY) ?? '[]';

      const users = JSON.parse(usersRaw) as User[];

      users.push({
        ...user,
        url: `https://avatar.iran.liara.run/public/${users.length + 1}`,
      });

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error(error);
      throw new Error('Error saving user');
    }
  }

  async deleteUser(index: number) {
    try {
      await sleep();

      const usersRaw = localStorage.getItem(USERS_KEY) ?? '[]';

      const users = JSON.parse(usersRaw) as User[];

      users.splice(index, 1);

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting user');
    }
  }
}

export default LocalStorageDS;
