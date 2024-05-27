// import { AuthContext } from '../context/auth';
// import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH } from '../path';

type Props = {
  children: React.ReactNode;
};

// TODO: Дослідити проблему видобуття accessToken з контексту
export default function ProtectedWrapper({ children }: Props) {
  // const { accessToken } = useContext(AuthContext);
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');

  // console.log(localStorage.getItem('accessToken'));
  // console.log(accessToken);

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
