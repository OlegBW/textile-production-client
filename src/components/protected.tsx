import { Navigate, useLocation } from 'react-router-dom';
import { PATH } from '../path';

type Props = {
  children: React.ReactNode;
};

export default function ProtectedWrapper({ children }: Props) {
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? (
    children
  ) : (
    <Navigate
      to={`/${PATH.auth.group}/${PATH.auth.login}`}
      state={{ from: location }}
      replace
    />
  );
}
