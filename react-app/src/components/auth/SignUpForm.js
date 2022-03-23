import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicSrc, setProfilePicSrc] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password.length < 4) {
      setErrors(['Password must be at least 4 characters.'])
    }

    if (password.length >= 4 && password !== repeatPassword) {
      setErrors(['Passwords must match.'])
    }


    const alpha = 'abcdefghijklmnopqrstuvwxyz'
    const specialChars = '!@#$%^&*(){}[]~`,./?;:"|\\\''
    const numbers = '0123456789'

    let specialCharCount = 0
    let numberCount = 0
    let uppercaseCount = 0
    // let lowercaseCount = 0

    for (let i = 0; i < password.length; i++) {
      let char = password[i]
      // if (alpha.includes(char)) lowercaseCount++
      if (alpha.toUpperCase().includes(char)) uppercaseCount++
      if (numbers.includes(char)) numberCount++
      if (specialChars.includes(char)) specialCharCount++
    }

    if (password === repeatPassword &&
      password.length >= 4 &&
      (specialCharCount === 0 || numberCount === 0 || uppercaseCount === 0)) {
      setErrors(['Password must contain at least one special character, one number, and one uppercase character.'])
    }

    if (firstName.length < 2 || lastName.length < 2) {
      setErrors(['First name and last name must be at least two characters each.'])
    }

    if (!email.includes('@') ||
      !email.includes('.') ||
      !email[email.indexOf('.') + 1] ||
      !email[email.indexOf('@') + 1] ||
      !email[email.indexOf('@') - 1] ||
      email[email.indexOf('@') + 1] === '.' ||
      email.indexOf('@') > email.indexOf('.')
    ) {
      setErrors(['Please enter a valid email.'])
    }

    console.log(errors)

    if (password === repeatPassword &&
      password.length >= 4 &&
      specialCharCount > 0 &&
      numberCount > 0 &&
      uppercaseCount > 0 &&
      email.includes('@') &&
      email.includes('.') &&
      email[email.indexOf('.') + 1] &&
      email[email.indexOf('@') - 1] &&
      !(email[email.indexOf('@') + 1] === '.') &&
      email.indexOf('@') < email.indexOf('.') &&
      email[email.indexOf('@') + 1] &&
      firstName.length > 1 &&
      lastName.length > 1 ) {
      const data = await dispatch(signUp(username, firstName, lastName, email, password, profilePicSrc));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateProfilePicSrc = (e) => {
    setProfilePicSrc(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Profile Picture URL</label>
        <input
          type='text'
          name='profilePicSrc'
          onChange={updateProfilePicSrc}
          value={profilePicSrc}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
