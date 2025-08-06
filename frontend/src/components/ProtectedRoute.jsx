// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Renders child routes
};

export default ProtectedRoute;
