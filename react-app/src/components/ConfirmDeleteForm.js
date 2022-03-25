import React from "react"
import { useDispatch } from "react-redux"
import { deletePostThunk } from "../store/posts"
import { useHistory, useParams } from 'react-router-dom'
import './ConfirmDeleteForm.css'

const ConfirmDeleteForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { postId } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(postId))
        history.push('/')
    }


    return (
        <div className='confirm-delete-container' >
            <form className='confirm-delete-form' onSubmit={handleSubmit}>
                <div>Are you sure you'd like to delete this post?</div>
                <div className='confirm-delete-buttons'>
                    <button type='submit'>Confirm</button>
                    <button onClick={() => history.push(`/posts/${postId}`)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ConfirmDeleteForm;