import MyContext from '@context/index';
import React from 'react';

const Home = () => {
  const { role } = React.useContext(MyContext);

  return (
    <div className="cd-flex cd-items-center cd-flex-col cd-gap-y-[4rem]">
      <h1 className="cd-text-4xl cd-font-bold cd-text-center">Bienvenido!</h1>

      <div className="cd-flex cd-flex-col cd-text-center cd-gap-y-[1rem]">
        {role === 'admin' && (
          <a
            className="cd-bg-violet-500 hover:cd-bg-violet-700 cd-text-white cd-font-bold cd-py-2 cd-px-4 cd-rounded"
            href="/users/form"
          >
            Crear usuario
          </a>
        )}

        <a
          className="cd-bg-blue-500 hover:cd-bg-blue-700 cd-text-white cd-font-bold cd-py-2 cd-px-4 cd-rounded"
          href="/users"
        >
          Ver usuarios
        </a>

        <a
          className="cd-bg-orange-500 hover:cd-bg-orange-700 cd-text-white cd-font-bold cd-py-2 cd-px-4 cd-rounded"
          href="/users/verified"
        >
          Ver usuarios verificados
        </a>
      </div>
    </div>
  );
};

export default Home;
