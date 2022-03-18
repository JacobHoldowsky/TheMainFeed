import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';

function PostDetail() {
    const [post, setPost] = useState({})
    const [comments, setComments] = useState({})
    const { postId } = useParams()

    useEffect(() => {
        if (!postId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/posts/${postId}`)
            const post = await response.json()
            setPost(post);
        })();
        (async () => {
            const response = await fetch(`/api/comments/${postId}`)
            const comments = await response.json()
            setComments(comments);
        })();
    }, [postId]);
    console.log('comments', comments)

    return (
        <div>
            <div>{post.first_name} {post.last_name}</div>
            <img src={post.img_src} alt="Post Detail" />
            <ul>
                {comments.map(comment => (
                comment.comment_content
            ))}
            </ul>
        </div>
    )

}

export default PostDetail;