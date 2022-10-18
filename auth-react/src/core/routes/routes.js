import Login from '../../pages/login';
import ResetPassword from '../../pages/resetPassword';
import ForgotPassword from '../../pages/forgotPassword';

const routes = [
  {
    path: '/',
    page: Login,
    isExact: true,
  },
  {
    path: '/reset',
    page: ResetPassword,
    isExact: true,
  },
  {
    path: '/forgot',
    page: ForgotPassword,
    isExact: true,
  },
];

export default routes;
