import React, { useState } from 'react';
import Header from '../components/header';
import { useHistory } from 'react-router-dom';
import { validatePassword } from '../utils/validator';
import { encrypt } from '../utils';
import request from '../core/request';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const history = useHistory();
  console.log('history', history.location.search);
  const [state, setState] = useState({
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
  });
  const [loading, setLoading] = useState(false);
  const handleState = (value, key) => {
    setState({ ...state, [key]: value, [key + 'Error']: '' });
  };

  const handleSubmit = async () => {
    let isValid = true;
    let localState = state;
    const passwordValidation = validatePassword(state.password);
    if (!passwordValidation.isValid) {
      isValid = false;
      localState = { ...localState, passwordError: passwordValidation.message };
    }
    const confirmPasswordValidation = validatePassword(state.confirmPassword);
    if (!confirmPasswordValidation.isValid) {
      isValid = false;
      localState = {
        ...localState,
        confirmPasswordError: confirmPasswordValidation.message,
      };
    }

    if (state.password !== state.confirmPassword) {
      isValid = false;
      localState = {
        ...localState,
        confirmPasswordError: `Password does not match!`,
      };
    }
    if (isValid) {
      setLoading(true);
      const params = new URLSearchParams(history.location.search);
      const email = params.get('email').replace(' ', '+');
      console.log('email', email);
      const token = params.get('token');
      const hashedPassword = await encrypt(state.password);
      let { data, status } = await request.put(`/user/resetpassword/${token}`, {
        email: email,
        password: hashedPassword,
      });
      if (status >= 400) {
        toast.error(data.message);
      }
      if (status >= 200 && status < 300) {
        toast.success('Successfully updated the password.');
        history.push('/');
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
            <div className='container'>
              <label className='label' for='psw'>
                New Password *
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
              <label className='label' for='cpsw'>
                Confirm Password *
              </label>
              <input
                type='password'
                placeholder='＊＊＊＊＊＊＊＊'
                name='cpsw'
                className='input'
                value={state.confirmPassword}
                onChange={({ target }) => {
                  handleState(target.value, 'confirmPassword');
                }}
              />
              <div className='error'>{state.confirmPasswordError}</div>
              <button
                className='button'
                type='submit'
                disabled={loading}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className='forgot-button'>
              <div
                onClick={() => {
                  history.push('/');
                }}
              >
                Back to Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
