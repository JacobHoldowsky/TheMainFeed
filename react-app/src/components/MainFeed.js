import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowedPostsThunk } from "../store/posts"

const MainFeed = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const followedPosts = useSelector(state => state.posts.posts)   
    const followedPostsArray = Object.values(followedPosts) 
    console.log("followedArray",followedPostsArray)

    useEffect(() => {
        dispatch(getFollowedPostsThunk(user.id))
    }, [dispatch, user])

    return (
            <div>
                {followedPostsArray.map(post => (
                    <img key={post.id} src={post.img_src} alt="" />
                ))}
                
            </div>
    )
}

export default MainFeed;