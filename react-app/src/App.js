import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import MainFeed from './components/MainFeed';
import PostDetail from './components/PostDetail';
import NewPostForm from './components/NewPostForm';
import EditPostForm from './components/EditPostForm'
import ConfirmDeleteForm from './components/ConfirmDeleteForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <div className='login-greeting'>
            <h1 className='login-h1'>The Main Feed</h1>
            <h2>Welcome Back!</h2>
          </div>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <div className='signup-greeting'>
            <h1 className='signup-h1'>The Main Feed</h1>
            <h2>Welcome!</h2>
          </div>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/new' exact={true} >
          <NewPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <PostDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <EditPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/delete' exact={true} >
          <ConfirmDeleteForm />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <div className='main-feed-greeting'>
            <h1 className='main-feed-h1'>The Main Feed</h1>
            <h2 className='main-feed-h2'>The place to connect with what you love</h2>
            <div className='external-links'>
              <a
                class='social-icon-link github'
                href="https://github.com/JacobHoldowsky"
                target='_blank'
                rel="noopener"
                aria-label='Github'
              >Github
                <i class='fab fa-github' />
              </a>
              <a
                class='social-icon-link linkedIn'
                href="https://www.linkedin.com/in/jacob-holdowsky-2b0baa103/"
                target='_blank'
                rel="noopener"
                aria-label='Github'
              >LinkedIn
                <i class='fab fa-linkedin' />
              </a>
            </div>
          </div>
          <MainFeed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
