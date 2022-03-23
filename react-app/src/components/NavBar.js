
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user)
  if (currentUser) {
    return (
      <nav className='NavBar'>
        <ul className='logged-in-nav'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active' className='NavButton Icon'>
              The Main Feed
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active' className='NavButton'>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to='/posts/new' exact={true} activeClassName='active' className='NavButton'>
              New Post
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav >
        <ul className='logged-out-nav'>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active' className='NavButton'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active' className='NavButton'>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;
