import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowedPostsThunk } from "../store/posts"
import PostDetail from "./PostDetail"
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
                    <div>{post.first_name} {post.last_name}</div>
                    <NavLink to={`/posts/${post.id}`}>
                        <img src={post.img_src} alt="post" />
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default MainFeed;