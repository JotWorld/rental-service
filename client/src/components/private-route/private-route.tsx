
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ authorizationStatus, children }) => {
  if (authorizationStatus === AuthorizationStatus.NoAuth) {

    return <Navigate to={AppRoute.Login} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
