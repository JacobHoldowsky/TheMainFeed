import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getFollowedPostsThunk, newPostThunk } from "../store/posts"
import {useHistory } from 'react-router-dom'

const NewPostForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [img_src, setImgSrc] = useState('')
    const [text_content, setTextContent] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const formData = new FormData()

        const post = {
            img_src,
            text_content
        }

        const data = await dispatch(newPostThunk(post))
        console.log('data',data)
        if (data) {
            await dispatch(getFollowedPostsThunk())
            
        } else {
            const data = await post.json()
            setErrors([data.errors])
        }

        history.push(`/posts/${data.createdPost.id}`)

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='postErrors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div>Make a new post</div>
                <div>
                    <input
                        type='text'
                        className='img-src-field'
                        name='img_src'
                        onChange={(e) => setImgSrc(e.target.value)}
                        value={img_src}
                        placeholder='Image URL'
                    ></input>
                </div>
                <div>
                    <input
                        type='text'
                        name='text_content'
                        className='text-content-field'
                        onChange={(e) => setTextContent(e.target.value)}
                        value={text_content}
                        placeholder='What do you think?'
                    ></input>
                </div>
                <button className='post-submit-button' type='submit'>Post</button>
            </form>
        </div>
    )
}

export default NewPostForm;