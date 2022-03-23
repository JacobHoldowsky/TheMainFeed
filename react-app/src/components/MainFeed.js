import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowedPostsThunk } from "../store/posts"
import { NavLink } from 'react-router-dom'
import './MainFeed.css';

const MainFeed = () => {
    const dispatch = useDispatch()
    const followedPosts = useSelector(state => state.posts.posts)


    useEffect(() => {
        dispatch(getFollowedPostsThunk())
    }, [dispatch])

    return (
        <div className='main-feed-posts-container'>
            {followedPosts.map(post => (
                <div key={post.id} className='main-feed-post-div'>
                    <NavLink to={`/users/${post.user_id}`}>
                        <div className='main-feed-post-username'>{post.username}</div>
                    </NavLink>
                    <NavLink to={`/posts/${post.id}`}>
                        <img className='main-feed-post-img' src={post.img_src} alt="post" />
                    </NavLink>
                    <p>{post.text_content}</p>
                </div>
            ))}
        </div>
    )
}

export default MainFeed;