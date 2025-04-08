// components/RequireAdmin.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({
  user,
  children,
}: {
  user: any;
  children: JSX.Element;
}) => {
  if (user?.role !== 'Administrator') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RequireAdmin;
