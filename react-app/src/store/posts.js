const GET_FOLLOWED_POSTS = 'posts/GET_FOLLOWED_POSTS'
const GET_USER_POSTS = 'posts/GET_USER_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const DELETE_POST = 'posts/DELETE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'

const getFollowedPosts = (followedPosts) => ({
    type: GET_FOLLOWED_POSTS,
    followedPosts
})

const getUserPosts = (userPosts) => ({
    type: GET_USER_POSTS,
    userPosts
})

const CreatePost = (createdPost) => ({
    type: CREATE_POST,
    createdPost
})

const deletePost = (deletedPost) => ({
    type: DELETE_POST,
    deletedPost
})

const updatePost = (updatedPost) => ({
    type: UPDATE_POST,
    updatedPost
})

export const getFollowedPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts/')

    if (response.ok) {
        const followedPosts = await response.json();
        await dispatch(getFollowedPosts(followedPosts))
    }
}

export const getUserPostsThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/posts`)

    if (response.ok) {
        const userPosts = await response.json();
        dispatch(getUserPosts(userPosts))
    }
}

export const newPostThunk = (newPost) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPost)
    })



    if (response.ok) {
        const createdPost = await response.json()
        const post = await dispatch(CreatePost(createdPost))
        return post
    }
}

export const updatePostThunk = (updatedPost, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost)
    })

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(updatePost(updatedPost));
        return updatedPost
    }
}

export const deletePostThunk = (postToDeleteId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postToDeleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const deletedPost = await response.json()
        await dispatch(deletePost(deletedPost))
    }
}



const initialState = { posts: [], userPosts: [] }

export default function postsReducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_FOLLOWED_POSTS:
            newState = { ...state }
            newState.posts = [...action.followedPosts.posts]
            newState.posts.forEach(post => newState[post.id] = post)
            return newState
        case GET_USER_POSTS:
            newState = {...state}
            newState.userPosts = [...action.userPosts.user_posts]
            newState.userPosts.forEach(post => newState[post.id] = post)
            return newState
        case CREATE_POST:
            newState = { ...state }
            newState.posts[action.createdPost.id] = action.createdPost
            return newState
        case DELETE_POST:
            newState = { ...state }
            delete newState[action.deletedPost.id]
            return newState
        case UPDATE_POST:
            newState = { ...state }
            newState[action.updatedPost.id] = action.updatedPost
            return newState
        default:
            return state
    }

}