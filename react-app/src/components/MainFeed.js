import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowedPostsThunk } from "../store/posts"
import { NavLink } from 'react-router-dom'

const MainFeed = () => {
    const dispatch = useDispatch()
    const followedPosts = useSelector(state => state.posts.posts)


    useEffect(() => {
        dispatch(getFollowedPostsThunk())
    }, [dispatch])

    return (
        <div>
            {followedPosts.map(post => (
                <div key={post.id}>
                    <NavLink to={`/users/${post.user_id}`}>
                        <div>{post.username}</div>
                    </NavLink>
                    <NavLink to={`/posts/${post.id}`}>
                        <img src={post.img_src} alt="post" />
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default MainFeed;