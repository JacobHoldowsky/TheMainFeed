import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserPostsThunk } from '../store/posts';
import { followThunk, getUserFollowedsThunk, unfollowThunk } from '../store/follows';

function User() {
  const [user, setUser] = useState({});
  const [followeds, setFolloweds] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { userId } = useParams();
  const dispatch = useDispatch()
  const userPosts = useSelector(state => state.posts.userPosts)
  const currentUser = useSelector(state => state.session.user)
  const currentUserFolloweds = useSelector(state => state.follows)


  useEffect(() => {
    dispatch(getUserPostsThunk(userId))
    dispatch(getUserFollowedsThunk(currentUser.id))
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
    
  }, [userId, dispatch, currentUser.id]);

  if (!user) {
    return null;
  }

  const handleFollow = async (e) => {
    dispatch(followThunk(userId))
    setFollowers(() => followers + 1)
  }

  const handleUnfollow = async (e) => {
    dispatch(unfollowThunk(userId))
    setFollowers(() => followers - 1)
  }

  return (
    <div>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <div>
        {parseInt(userId) !== parseInt(currentUser?.id) && !(currentUserFolloweds[userId]) &&
          <button className='profile-follow-button' onClick={handleFollow}>Follow</button>}
        {parseInt(userId) !== parseInt(currentUser.id) && currentUserFolloweds[userId] &&
          <button className='profile-follow-button' onClick={handleUnfollow}>Unfollow</button>}
      </div>
      {userPosts.map(post => (
        <div key={post.id}>
          <NavLink to={`/posts/${post.id}`}>
            <img src={post.img_src} alt="Broken Tag" />
          </NavLink>
        </div>
      ))}
    </div>
    
  );
}
export default User;
