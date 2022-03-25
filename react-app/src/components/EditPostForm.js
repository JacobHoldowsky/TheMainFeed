import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFollowedPostsThunk, getUserPostsThunk, updatePostThunk } from "../store/posts"
import { useHistory, useParams } from 'react-router-dom'
import './EditPostForm.css'


const EditPostForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const { postId } = useParams()
    const post = useSelector(state => state.posts[postId])
    const [img_src, setImgSrc] = useState(post.img_src)
    const [text_content, setTextContent] = useState(post.text_content)

    useEffect(() => {
        dispatch(getFollowedPostsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const formData = new FormData()

        const post = {
            img_src,
            text_content
        }

        if (!(img_src.includes('https://')) && !(img_src.includes('data:image'))) {
            setErrors(['Please insert a valid image address.'])
        }

        if ((img_src.includes('https://')) || (img_src.includes('data:image'))) {
            const data = await dispatch(updatePostThunk(post, postId))

            if (data) {
                await dispatch(getFollowedPostsThunk())

            } else {
                const data = await post.json()
                setErrors([data.errors])
            }

            history.push(`/posts/${data.id}`)
        }

    }


    return (
        <div className='edit-post-form-container'>
            <h2>Edit this post</h2>
            <form onSubmit={handleSubmit}>
                <div className='postErrors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div className='edit-post-form'>
                    <div className='form-field'>
                        <input
                            type='text'
                            className='img-src-field'
                            name='img_src'
                            onChange={(e) => setImgSrc(e.target.value)}
                            value={img_src}
                            placeholder={post.img_src}
                            required={true}
                        ></input>
                    </div>
                    <div className='form-field'>
                        <input
                            type='text'
                            name='text_content'
                            className='text-content-field'
                            onChange={(e) => setTextContent(e.target.value)}
                            value={text_content}
                            placeholder={post.text_content}
                        ></input>
                    </div>
                    <div className='edit-post-buttons'>
                        <div>
                            <button className='edit-submit-button' type='submit'>Submit</button>
                        </div>
                        <div>
                            <button onClick={() => history.push(`/posts/${postId}`)}>Cancel</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default EditPostForm;