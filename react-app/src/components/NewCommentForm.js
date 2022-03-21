import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import { getPostCommentsThunk, newCommentThunk } from "../store/comments"

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

        const data = await dispatch(newCommentThunk(newComment, postId))
        console.log('data', data)
        if (data) {
            await dispatch(getPostCommentsThunk(postId))

        } else {
            const data = await newComment.json()
            setErrors([data.errors])
        }

        setCommentContent('')

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='commentErrors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div>Post a comment!</div>
                <div>
                    <input
                        type='textarea'
                        className='comment-content-field'
                        name='comment_contentf'
                        onChange={(e) => setCommentContent(e.target.value)}
                        value={comment_content}
                        placeholder='Comment'
                    ></input>
                </div>
                <button className='comment-submit-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewCommentForm;