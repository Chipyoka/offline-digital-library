// components/SideMenu.jsx
import { useLocation, Link } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const navConfig = {
  admin: [
    { path: 'dashboard', label: 'Home' },
    { path: 'profile', label: 'Assessments' },
    { path: 'help', label: 'Help Center' },
    { path: 'settings', label: 'Admin Panel' },
  ],
  student: [
    { path: 'dashboard', label: 'Home' },
    { path: 'profile', label: 'Assessments' },
    { path: 'help', label: 'Help Center' },
  ],
  guest: [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'Help Center' },
  ],
};

const SideMenu = () => {
  const { pathname } = useLocation();
  const user = useUserStore((state) => state.user);
  const role = user?.role || 'guest';
  const menuItems = navConfig[role];

  return (
    <aside className="side-menu">
        <h4 className="my-1">Menu</h4>
      <ul>
        {menuItems.map((item) => {
          // Prepend the role to the path if not guest
          const fullPath = role !== 'guest' ? `/${role}/${item.path}` : `/${item.path}`;
          const isActive = pathname === fullPath;

          return (
            <li key={item.path} className={isActive ? 'active' : ''}>
              <Link to={fullPath}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideMenu;
