import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import { getPostCommentsThunk, newCommentThunk } from "../store/comments"
import './NewCommentForm.css'

const NewCommentForm = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [comment_content, setCommentContent] = useState('')
    const { postId } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newComment = {
            comment_content
        }

        if (comment_content.length >= 255) {
            setErrors(['Comment must be less than 255 characters.'])
        }

        if (comment_content.length < 255) {
            const data = await dispatch(newCommentThunk(newComment, postId))
    
            if (data) {
                await dispatch(getPostCommentsThunk(postId))
    
            } else {
                const data = await newComment.json()
                setErrors([data.errors])
            }
    
            setCommentContent('')
        }


    }


    return (
        <div >
            <form className='post-comment-container' onSubmit={handleSubmit}>
                <div className='commentErrors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div className='comment-box-header'>Post a comment!</div>
                <div className='comment-textarea'>
                    <textarea
                        type='textarea'
                        className='comment-content-field'
                        name='comment_contentf'
                        onChange={(e) => setCommentContent(e.target.value)}
                        value={comment_content}
                        placeholder='Comment'
                    ></textarea>
                </div>
                <button className='comment-submit-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewCommentForm;