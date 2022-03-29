import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getFollowedPostsThunk, newPostThunk } from "../store/posts"
import {useHistory } from 'react-router-dom'
import './NewPostForm.css'

const NewPostForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [img_src, setImgSrc] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [text_content, setTextContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {
            img_src,
            text_content
        }

        if (!(img_src.includes('jpeg')) && !(img_src.includes('data:image')) && !(img_src.includes('jpg'))) {
            setErrors(['Please insert a valid image address.'])
        }

        if (text_content.length > 100) {
            setErrors(['Caption may not exceed 100 characters.'])
        }

        if (((img_src.includes('jpeg')) || (img_src.includes('jpg')) || (img_src.includes('data:image'))) && text_content.length <= 100 && !submitted) {
            setSubmitted(true)
            const data = await dispatch(newPostThunk(post))

            if (data) {
                await dispatch(getFollowedPostsThunk())

            } else {
                const data = await post.json()
                setErrors([data.errors])
            }
            history.push(`/posts/${data.createdPost.id}`)
        }


    }


    return (
        <div className='new-post-form-container'>
            <h2>Make a new post</h2>
            <form onSubmit={handleSubmit}>
                <div className='postErrors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div className='new-post-form'>
                    <div className='form-field'>
                        <label htmlFor='img-src'>Image Address</label>
                        <input
                            type='text'
                            className='img-src-field'
                            name='img_src'
                            onChange={(e) => setImgSrc(e.target.value)}
                            value={img_src}
                            placeholder='Valid Image Address'
                            required={true}
                        ></input>
                    </div>
                    <div className='form-field'>
                        <label htmlFor='text-content'>Caption</label>
                        <input
                            type='text'
                            name='text_content'
                            className='text-content-field'
                            onChange={(e) => setTextContent(e.target.value)}
                            value={text_content}
                            placeholder='What do you think?'
                            required={true}
                        ></input>
                    </div>
                    <button className='post-submit-button' type='submit'>Post</button>
                </div>
                
            </form>
        </div>
    )
}

export default NewPostForm;