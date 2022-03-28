import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from 'react-router-dom';
import { deleteCommentThunk, getPostCommentsThunk } from "../store/comments";
import { getUserFollowedsThunk } from "../store/follows";
import { getFollowedPostsThunk } from "../store/posts";
import EditCommentModal from "./EditCommentModal/EditCommentModal";
import NewCommentForm from "./NewCommentForm";
import './PostDetail.css'

function PostDetail() {
    const dispatch = useDispatch()
    const [post, setPost] = useState({})
    // const [comments, setComments] = useState()
    const { postId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments.comments)

    useEffect(() => {
        dispatch(getFollowedPostsThunk())
        dispatch(getPostCommentsThunk(postId))
        dispatch(getUserFollowedsThunk(currentUser.id))
        if (!postId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/posts/${postId}`)
            const post = await response.json()
            setPost(post);
        })();
    }, [postId, dispatch, currentUser.id]);

    const handleDeleteComment = async (commentId) => {
        await dispatch(deleteCommentThunk(commentId))
        await dispatch(getPostCommentsThunk(postId))
    }

    // const handleEditComment = async (commentId) => {

    // }

    return (
        <div className='post-detail-container'>
            <NavLink to={`/users/${post?.user_id}`}>
                <h2 id='post-detail-username' className='post-detail-username'>{post?.username}</h2>
            </NavLink>
            <img className='post-detail-img' src={post.img_src} alt="Post Detail" />
            <p className='post-detail-cap'>{post?.text_content}</p>
            {
                post?.user_id === currentUser.id &&
                <div className='post-detail-edit-delete'>
                    <div>
                        <NavLink to={`/posts/${post.id}/delete`}><button>Delete</button></NavLink>
                    </div>
                    <div>
                        <NavLink to={`/posts/${post.id}/edit`}><button>Edit</button></NavLink>
                    </div>
                </div>
            }
            <div className='bigger-comments-container'>
                <h2>Comments</h2>
                <div className='comments-container'>
                    {comments?.map(comment => (
                        <div key={comment.id} className="comment-container">
                            <div className='comment-info'>
                                <NavLink to={`/users/${post?.user_id}`} className="commenter-username">{comment.username}</NavLink>
                            </div>
                            <div>
                                <div className='comment-content'>{comment.comment_content}</div>
                            </div>
                            {
                                comment.user_id === currentUser.id &&
                                <div className='comment-edit-delete-container'>
                                    <div>
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </div>
                                    <div>
                                        <EditCommentModal comment={comment} />
                                    </div>
                                </div>


                            }
                        </div>
                    ))}
                </div>
                <NewCommentForm />
            </div>
            </div>
            
    )

}

export default PostDetail;