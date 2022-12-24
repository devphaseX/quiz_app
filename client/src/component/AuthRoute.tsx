import { useSelector } from 'react-redux';
import { Navigate, NavigateProps } from 'react-router-dom';

const AuthRoute = ({
  children,
  option,
}: {
  children: any;
  option: NavigateProps;
}) => {
  const appNavigateRoute = useSelector(
    (state: GlobalStoreState) => !!state.result.userId
  );
  return appNavigateRoute ? children : <Navigate {...option} />;
};

export { AuthRoute };
