import DataRepo from '@api/datasource';
import { QKeys } from '@constants/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UserProfileProps = {
  name: string;
  url: string;
  verified?: boolean;
  index?: number;
};

const UserProfile = (props: UserProfileProps) => {
  const { name, url, verified, index } = props;

  const queryClient = useQueryClient();

  const userDeleteMutation = useMutation<void, Error, number>({
    mutationFn: async (index: number) => {
      DataRepo.deleteUser(index);

      await queryClient.invalidateQueries({
        queryKey: [QKeys.GET_USER_BY_INDEX, index],
        exact: true,
      });

      await queryClient.invalidateQueries({
        queryKey: [QKeys.GET_USERS],
        exact: true,
      });
    },
    onSettled: (_, error) => {
      if (error) {
        alert('Error deleting user');
        return;
      }

      alert('User deleted');
    },
  });

  return (
    <div className="shadow-lg p-[1rem] border border-gray-200 rounded-lg text-center">
      <img
        src={url}
        alt="Avatar"
        className="avatar"
        height="auto"
        width="200"
      />
      <h2 className="text-lg">{name}</h2>
      <p
        className={`text-base ${verified ? 'text-green-500' : 'text-red-500'}`}
      >
        {verified ? 'Verified' : 'Not verified'}
      </p>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-600"
        onClick={copyData}
      >
        Copiar datos
      </button>

      {index !== undefined && index >= 0 && (
        <a
          className="bg-cyan-500 text-white px-4 py-2 rounded mt-2 block hover:bg-cyan-600"
          href={`/users/view/${index}`}
        >
          Ver perfil
        </a>
      )}
      {index !== undefined && index >= 0 && (
        <a
          className="bg-orange-500 text-white px-4 py-2 rounded mt-2 block hover:bg-orange-600"
          href={`/users/form/${index}`}
        >
          Modificar perfil
        </a>
      )}
      {index !== undefined && index >= 0 && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2 block hover:bg-red-600 w-full"
          onClick={() => userDeleteMutation.mutate(index)}
        >
          Eliminar perfil
        </button>
      )}
    </div>
  );

  function copyData() {
    const text = `${name} ${verified ? 'Verified' : 'Not verified'}`;

    navigator.clipboard.writeText(text);

    alert('Datos copiados al portapapeles');
  }
};

export default UserProfile;
