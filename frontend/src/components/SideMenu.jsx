// components/SideMenu.jsx
import useUserStore from '../store/userStore';
import { Link } from 'react-router-dom';

const navConfig = {
  admin: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/users', label: 'Manage Users' },
    { path: '/settings', label: 'Settings' },
  ],
  user: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
  ],
  guest: [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About Us' },
  ],
};

const SideMenu = () => {
  const user = useUserStore((state) => state.user);
  const role = user?.role || 'guest';
  const menuItems = navConfig[role];

  return (
    <aside className="side-menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;
