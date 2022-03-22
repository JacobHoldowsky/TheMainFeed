import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePostThunk, getFollowedPostsThunk, updatePostThunk } from "../store/posts"
import { useHistory, useParams } from 'react-router-dom'

const ConfirmDeleteForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { postId } = useParams()
    const post = useSelector(state => state.posts[postId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(postId))
        history.push('/')
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>Are you sure you'd like to delete this post?</div>
                <div>
                    <button type='submit'>Confirm</button>
                </div>
                <div>
                    <button onClick={() => history.push(`/posts/${postId}`)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ConfirmDeleteForm;