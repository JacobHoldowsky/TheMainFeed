import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserPostsThunk } from '../store/posts';
import { followThunk, getUserFollowedsThunk, unfollowThunk } from '../store/follows';
import './User.css'

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

    (async () => {
      const response = await fetch(`/api/follows/${userId}/followeds`)
      const followeds = await response.json()
      setFolloweds(followeds.followeds.length);
    })();

    (async () => {
      const response = await fetch(`/api/follows/${userId}/followers`)
      const followers = await response.json()
      setFollowers(followers.followers.length);
    })();

  }, [userId, dispatch, currentUser.id]);

  if (!user) {
    return null;
  }

  const handleFollow = async (e) => {
    await dispatch(followThunk(userId))
    setFollowers(() => followers + 1)
  }

  const handleUnfollow = async (e) => {
    await dispatch(unfollowThunk(userId))
    setFollowers(() => followers - 1)
  }

  return (
    <div >
      <div className='user-container'>
        <h1 id='profile-username'>{user.username}</h1>
        <ul className='user-info'>
          <li>
            <strong>Posts</strong> {userPosts.length}
          </li>
          <li>
            <strong>Followers</strong> {followers}
          </li>
          <li>
            <strong>Following</strong> {followeds}
          </li>
        </ul>
      </div>
      <div className='follow-btn'>
        {parseInt(userId) !== parseInt(currentUser?.id) && !(currentUserFolloweds[userId]) &&
          <button className='profile-follow-button' onClick={handleFollow}>Follow</button>}
        {parseInt(userId) !== parseInt(currentUser.id) && currentUserFolloweds[userId] &&
          <button className='profile-follow-button' onClick={handleUnfollow}>Unfollow</button>}
      </div>
      <div className='images-container'>
        {userPosts.map(post => (
          <div key={post.id}>
            <NavLink to={`/posts/${post.id}`}>
              <img className='profile-img' src={post.img_src} alt="Broken Tag" />
            </NavLink>
          </div>
        ))}
      </div>

    </div >

  );
}
export default User;
