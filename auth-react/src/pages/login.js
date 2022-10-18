import React, { useState } from 'react';
import Header from '../components/header';
import { validateEmail, validatePassword } from '../utils/validator';
import { encrypt, getDevAppLink } from '../utils';
import request from '../core/request';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const { NODE_ENV } = process.env

const Login = () => {
  const [state, setState] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleState = (value, key) => {
    setState({ ...state, [key]: value, [key + 'Error']: '' });
  };

  const handleLogin = async () => {
    let isValid = true;
    let localState = state;
    const emailValidation = validateEmail(state.email);
    if (!emailValidation.isValid) {
      isValid = false;
      localState = { ...localState, emailError: emailValidation.message };
    }
    const passwordValidation = validatePassword(state.password);
    if (!passwordValidation.isValid) {
      isValid = false;
      localState = { ...localState, passwordError: passwordValidation.message };
    }
    if (isValid) {
      setLoading(true);
      const hashedPassword = await encrypt(state.password);
      let { data, status } = await request.post(`/user/signin`, {
        email: state.email,
        password: hashedPassword,
      });
      if (status >= 400) {
        toast.error(data.message);
      }
      if (status >= 200 && status < 300) {
        let redirectionLink = data?.data?.redirectLink
        if (NODE_ENV === 'development') {
          let link = getDevAppLink(redirectionLink)
          if (link) {
            redirectionLink = link
          }
        }
        toast.success('Successfully signed in, redirecting...');
        window.open(redirectionLink, '_self');
      }
      setLoading(false);
    } else {
      setState(localState);
    }
  };

  return (
    <div className='flex flex-column'>
      <Header />
      <div className='flex flex-center'>
        <div className='flex card'>
          <div>
            <div>
              <div className='container'>
                <label className='label' htmlFor='email'>
                  Email Id *
                </label>
                <input
                  type='email'
                  placeholder='eg: example@mail.com'
                  name='email'
                  className='input'
                  value={state.email}
                  onChange={({ target }) => {
                    handleState(target.value, 'email');
                  }}
                />
                <div className='error'>{state?.emailError}</div>
                <label className='label' htmlFor='psw'>
                  Password *
                </label>
                <input
                  type='password'
                  placeholder='＊＊＊＊＊＊＊＊'
                  name='psw'
                  className='input'
                  value={state.password}
                  onChange={({ target }) => {
                    handleState(target.value, 'password');
                  }}
                />
                <div className='error'>{state.passwordError}</div>
                <button
                  onClick={handleLogin}
                  className='button'
                  disabled={loading}
                >
                  Login
                </button>
              </div>
            </div>
            <div className='forgot-button'>
              <div
                onClick={() => {
                  history.push('/forgot');
                }}
              >
                Forgot Password?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
