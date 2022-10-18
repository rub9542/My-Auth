import axios from 'axios';
import { env } from '../utils/const';

const request = axios.create({
  baseURL: env.REACT_APP_AUTH_API,
  headers: {},
  validateStatus: function (status) {
    return true;
  },
});
export default request;
