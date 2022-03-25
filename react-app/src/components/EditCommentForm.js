import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPostCommentsThunk, updateCommentThunk } from "../store/comments";
import './EditCommentForm.css'

export default function UpdateCommentForm({ commentInfo, setShowModal }) {
    const dispatch = useDispatch();

    const [newCommentEdit, setNewCommentEdit] = useState(commentInfo.comment_content);
    const handleNewComment = (e) => setNewCommentEdit(e.target.value);

    const handleCommentEdit = async (e) => {
        e.preventDefault();
        const newComment = {
            comment_content: newCommentEdit
        };

        await dispatch(updateCommentThunk(newComment, commentInfo.id));
        await dispatch(getPostCommentsThunk(commentInfo.post_id))

        setShowModal(false)
    };


    return (
        <div className="edit-comment-container">
            <h2 className='edit-comment-header'>Edit Comment</h2>
            <form className="edit-comment-form" onSubmit={handleCommentEdit}>
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
