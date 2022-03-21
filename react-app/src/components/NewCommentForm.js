import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowedPostsThunk, newPostThunk } from "../store/posts"
import { useHistory } from 'react-router-dom'

const NewPostForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [img_src, setImgSrc] = useState('')
    const [comment_content, setCommentContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const formData = new FormData()

        const post = {
            comment_content
        }

        const data = await dispatch(NewC)
        console.log('data', data)
        if (data) {
            await dispatch(getFollowedPostsThunk())

        } else {
            const data = await post.json()
            setErrors([data.errors])
        }

        history.push(`/posts/${data.CreatedPost.id}`)

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='commentErrors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div>Post a comment</div>
                <div>
                    <input
                        type='textarea'
                        className='comment-content-field'
                        name='comment_contentf'
                        onChange={(e) => setImgSrc(e.target.value)}
                        value={comment_contentf}
                        placeholder='Image URL'
                    ></input>
                </div>
                <button className='comment-submit-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewPostForm;