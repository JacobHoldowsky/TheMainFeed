import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { deletePostThunk, getFollowedPostsThunk, updatePostThunk } from "../store/posts";

function PostDetail() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState()
    const { postId } = useParams()
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getFollowedPostsThunk())
        if (!postId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/posts/${postId}`)
            const post = await response.json()
            setPost(post);
        })();
            (async () => {
                const response = await fetch(`/api/comments/${postId}`)
                const comments = await response.json()
                setComments(comments.comments);
            })();
    }, [postId, dispatch]);

    const handleDelete = async () => {
        await dispatch(deletePostThunk(postId))
        // await dispatch(getFollowedPostsThunk())
        history.push('/')
    }

    const handleEdit = async () => {
        await dispatch(updatePostThunk())
        history.push()
    }

    return (
        <div>
            <div>{post.first_name} {post.last_name}</div>
            <img src={post.img_src} alt="Post Detail" />
            <p>{post.text_content}</p>
            <ul>
                {comments?.map(comment => (
                    <div key={comment.id} className="comment">
                        <li className="commenter-username">{comment.username}</li>
                        <li className='comment-content'>{comment.comment_content}</li>
                    </div>
                ))}
            </ul>
            {
                post.user_id === currentUser.id &&
                <div>
                    <button onClick={handleDelete}>
                        Delete
                    </button>
                    <NavLink to={`/posts/${post.id}/edit`}><button>Edit</button></NavLink>
                    {/* <button onClick={() => handleEdit}>
                        Edit
                    </button> */}
                </div>
            }
        </div>
    )

}

export default PostDetail;