const GET_POST_COMMENTS = 'comments/GET_POST_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'

const getPostComments = (postComments) => ({
    type: GET_POST_COMMENTS,
    postComments
})

const createComment = (createdComment) => ({
    type: CREATE_COMMENT,
    createdComment
})

const deleteComment = (deletedComment) => ({
    type: DELETE_COMMENT,
    deletedComment
})

const updateComment = (updatedComment) => ({
    type: UPDATE_COMMENT,
    updatedComment
})

export const getPostCommentsThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${postId}`)

    if (response.ok) {
        const postComments = await response.json();
        dispatch(getPostComments(postComments))
    }
}

export const newCommentThunk = (newComment, postId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
    })

    console.log(response)

    if (response.ok) {
        const createdComment = await response.json()
        const post = await dispatch(createComment(createdComment))
        return post
    }
}

export const updateCommentThunk = (updatedComment, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComment)
    })

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(updateComment(updatedComment));
        return updatedComment
    }
}

export const deleteCommentThunk = (commentToDeleteId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentToDeleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const deletedComment = await response.json()
        await dispatch(deleteComment(deletedComment))
    }
}



const initialState = { comments: [] }

export default function commentsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_POST_COMMENTS:
            newState = { ...state }
            newState.comments = [...action.postComments.comments]
            newState.comments.forEach(comment => newState[comment.id] = comment)
            return newState
        case CREATE_COMMENT:
            newState = { ...state }
            newState.comments[action.createdComment.id] = action.CreatedComment
            return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.deletedComment.id]
            return newState
        case UPDATE_COMMENT:
            newState = { ...state }
            newState[action.updatedComment.id] = action.updatedComment
            return newState
        default:
            return state
    }

}