import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useCurrentToken, useCurrentUser } from '../redux/features/auth/authSlice';

const CustomerProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);

  if (!token || user?.role === 'admin') {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default CustomerProtectedRoute;