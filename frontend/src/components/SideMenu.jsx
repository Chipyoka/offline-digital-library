import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { useState } from 'react';

const navConfig = {
  admin: [
    { path: 'dashboard', label: 'Home' },
    { path: 'assessments', label: 'Assessments' },
    { path: 'help', label: 'Help Center' },
    { path: 'settings', label: 'Admin Panel' },
  ],
  student: [
    { path: 'dashboard', label: 'Home' },
    { path: 'assessments', label: 'Assessments' },
    { path: 'help', label: 'Help Center' },
  ],
  guest: [
    { path: 'dashboard', label: 'Home' },
    { path: 'help', label: 'Help Center' },
  ],
};

const SideMenu = () => {
  const { pathname } = useLocation();
  const user = useUserStore((state) => state.user);
  const role = user?.role || 'guest';
  const menuItems = navConfig[role];
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState(pathname);

  const handleNav = (item) => {
    // const fullPath = role !== 'guest' ? `/${role}/${item.path}` : `/${item.path}`;
    const fullPath = `/${role}/${item.path}`;
    
    setActivePath(fullPath);
    if (pathname !== fullPath) {
      navigate(fullPath);
    }
  };

  return (
    <aside className="side-menu">
      <h4 className="my-1">Menu</h4>
      <ul>
        {menuItems.map((item) => {
          const fullPath = role !== 'guest' ? `/${role}/${item.path}` : `/${item.path}`;
          const isActive = pathname === fullPath;

          return (
            <li
              key={item?.path}
              className={isActive ? 'active' : ''}
              onClick={() => handleNav(item)}
            >
              {item?.label}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideMenu;
