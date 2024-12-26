import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="cd-h-full cd-w-full cd-flex cd-justify-center cd-items-center">
      <Outlet />
    </div>
  );
};

export default Layout;
