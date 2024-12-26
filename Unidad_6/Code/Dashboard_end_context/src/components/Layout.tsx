import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import MyContext from '@context/index';

const Layout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { name, role, schema, toggleSchema } = React.useContext(MyContext);

  React.useEffect(() => {
    if (role === 'user' && location.pathname.includes('users/form')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, role]);

  return (
    <div className="cd-h-full cd-w-full cd-flex cd-flex-col cd-justify-center cd-items-center dark:cd-bg-zinc-800">
      <button
        className="cd-absolute cd-top-[1rem] cd-right-[1rem] cd-p-2 cd-bg-blue-500 cd-text-white cd-rounded-md dark:cd-bg-blue-700"
        onClick={toggleSchema}
      >
        Toggle {schema}
      </button>

      <h1 className="cd-text-3xl cd-mb-[1rem]">Welcome {name}!</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
