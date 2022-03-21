import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getPostCommentsThunk } from "../store/comments";
import { deletePostThunk, getFollowedPostsThunk, updatePostThunk } from "../store/posts";
import NewCommentForm from "./NewCommentForm";

function PostDetail() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [post, setPost] = useState({})
    // const [comments, setComments] = useState()
    const { postId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments.comments)
    console.log(comments)

    useEffect(() => {
        dispatch(getFollowedPostsThunk())
        dispatch(getPostCommentsThunk(postId))
        if (!postId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/posts/${postId}`)
            const post = await response.json()
            setPost(post);
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
            <ul>
                {comments?.map(comment => (
                    <div key={comment.id} className="comment">
                        <li className="commenter-username">{comment.username}</li>
                        <li className='comment-content'>{comment.comment_content}</li>
                    </div>
                ))}
            </ul>
            <NewCommentForm />
        </div>
    )

}

export default PostDetail;