import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from 'react-router-dom';
import { deletePostThunk, getFollowedPostsThunk } from "../store/posts";

function PostDetail() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState()
    const { postId } = useParams()
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
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
    }, [postId]);

    const handleDelete = async () => {
        await dispatch(deletePostThunk(postId))
        history.push('/')
    }

    const handleEdit = async () => {
        await fetch(`/api/posts/${post.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <div>
            <div>{post.first_name} {post.last_name}</div>
            <img src={post.img_src} alt="Post Detail" />
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
                    {/* <button onClick={() => handleEdit}>
                        Edit
                    </button> */}
                </div>
            }
        </div>
    )

}

export default PostDetail;