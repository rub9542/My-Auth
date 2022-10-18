import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../components/header';
import { validateEmail } from '../utils/validator';
import request from '../core/request';

const ForgotPassword = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    emailError: '',
  });
  const handleState = (value, key) => {
    setState({ ...state, [key]: value, [key + 'Error']: '' });
  };

  const handleSubmit = async () => {
    let isValid = true;
    let localState = state;
    const emailValidation = validateEmail(state.email);
    if (!emailValidation.isValid) {
      isValid = false;
      localState = { ...localState, emailError: emailValidation.message };
    }
    if (isValid) {
      let { data, status } = await request.post(`/user/forgotpassword`, {
        email: state.email,
      });
      if (status >= 400) {
        toast.error(data.message);
      }
      if (status >= 200 && status < 300) {
        toast.success('Reset password link is sent to your email');
        history.push('/');
      }
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
              <label className='label' for='email'>
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
              <button className='button' onClick={handleSubmit}>
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

export default ForgotPassword;
