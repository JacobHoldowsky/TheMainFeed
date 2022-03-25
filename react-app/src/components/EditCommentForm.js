import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPostCommentsThunk, updateCommentThunk } from "../store/comments";
import './EditCommentForm.css'

export default function UpdateCommentForm({ commentInfo, setShowModal }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [newCommentEdit, setNewCommentEdit] = useState(commentInfo.comment_content);

    const handleNewComment = (e) => setNewCommentEdit(e.target.value);

    const handleCommentEdit = async (e) => {
        e.preventDefault();

        const newComment = {
            comment_content: newCommentEdit
        };

        if (newCommentEdit.length >= 255) {
            setErrors(['Comment must be less than 255 characters.'])
        }

        if (newCommentEdit.length < 255) {
            const data = await dispatch(updateCommentThunk(newComment, commentInfo.id));

            if (data) {
                await dispatch(getPostCommentsThunk(commentInfo.post_id))
            } else {
                const data = await newComment.json()
                setErrors([data.errors])
            }

            setNewCommentEdit('')
            setShowModal(false)
        }
        
    };


    return (
        <div className="edit-comment-container">
            <h2 className='edit-comment-header'>Edit Comment</h2>
            <form className="edit-comment-form" onSubmit={handleCommentEdit}>
                <div className='commentErrors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <label htmlFor="commentLabel"></label>
                <textarea
                    type="text"
                    className='edit-comment-box'
                    value={newCommentEdit}
                    onChange={handleNewComment}
                    required={true}
                />
                <button className="edit-comment-btn" type="submit">Update</button>
            </form>
        </div>
    );
}
