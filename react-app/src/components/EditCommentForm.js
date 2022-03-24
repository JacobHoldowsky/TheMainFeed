import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPostCommentsThunk, updateCommentThunk } from "../store/comments";
// import './editCommentForm.css'

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
        <div className="createNewCommentDiv">
            <form className="createNewCommentForm" onSubmit={handleCommentEdit}>
                <label htmlFor="commentLabel"></label>
                <textarea
                    type="text"
                    className='edit-comment-box'
                    value={newCommentEdit}
                    onChange={handleNewComment}
                    required={true}
                />
                <button className="updateCommentFormButton" type="submit">Update</button>
            </form>
        </div>
    );
}
