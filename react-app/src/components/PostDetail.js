import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { deleteCommentThunk, getPostCommentsThunk } from "../store/comments";
import { deletePostThunk, getFollowedPostsThunk, updatePostThunk } from "../store/posts";
import EditCommentModal from "./EditCommentModal/EditCommentModal";
import NewCommentForm from "./NewCommentForm";

function PostDetail() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [post, setPost] = useState({})
    // const [comments, setComments] = useState()
    const { postId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments.comments)

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

    const handleDeleteComment = async (commentId) => {
        await dispatch(deleteCommentThunk(commentId))
        await dispatch(getPostCommentsThunk(postId))
    }  

    const handleEditComment = async (commentId) => {
        
    }

    return (
        <div>
            <div>{post.first_name} {post.last_name}</div>
            <img src={post.img_src} alt="Post Detail" />
            <p>{post.text_content}</p>
            {
                post.user_id === currentUser.id &&
                <div>
                    <NavLink to={`/posts/${post.id}/delete`}><button>Delete</button></NavLink>
                    <NavLink to={`/posts/${post.id}/edit`}><button>Edit</button></NavLink>
                </div>
            }
            <ul>
                {comments?.map(comment => (
                    <div key={comment.id} className="comment">
                        <ul>   
                            <li className="commenter-username">{comment.username}</li>
                            <li className='comment-content'>{comment.comment_content}</li>
                        </ul>
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        <EditCommentModal comment={comment} />
                    </div>
                ))}
            </ul>
            <NewCommentForm />
        </div>
    )

}

export default PostDetail;