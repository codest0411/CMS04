import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

const ProtectedRoute = () => {
  const { tokens } = useAuthStore();
  const location = useLocation();

  if (!tokens?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
