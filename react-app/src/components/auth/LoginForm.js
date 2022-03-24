import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemoUser = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login('demo@aa.io', 'Password!1'))
  }

  return (
    <div className='login-form-container'>
      <h2>Login</h2>
      <form onSubmit={onLogin} >
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-form'>
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div id='password-field' className='form-field'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='login-buttons'>
            <button type='submit'>Login</button>
            <button onClick={handleDemoUser}>Demo User</button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default LoginForm;
