const GET_FOLLOWED_POSTS = 'posts/GET_FOLLOWED_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const DELETE_POST = 'posts/DELETE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'

const getFollowedPosts = (followedPosts) => ({
    type: GET_FOLLOWED_POSTS,
    followedPosts
})

const CreatePost = (CreatedPost) => ({
    type: CREATE_POST,
    CreatedPost
})

const deletePost = (deletedPost) => ({
    type: DELETE_POST,
    deletedPost
})

const updatePost = (updatedPost) => ({
    type: UPDATE_POST,
    updatedPost
})

export const getFollowedPostsThunk = (userId) => async(dispatch) => {
    const response = await fetch('/api/posts/')

    if (response.ok) {
        const followedPosts = await response.json();
        dispatch(getFollowedPosts(followedPosts))
    }
}

export const newPostThunk = (newPost) => async(dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'POST',
        body: newPost
    })

    if (response.ok) {
        const CreatedPost = await response.json()
        dispatch(CreatePost(CreatedPost))
    }
}

export const deletePostThunk = (postToDeleteId) => async(dispatch) => {
    const response = await fetch(`/api/posts/${postToDeleteId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        const deletedPost = await response.json()
        dispatch(deletePost(deletedPost))
    }
}

export const updatePostThunk = (updatedPost, postId) => async(dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'POST',
        body: updatedPost
    })

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(updatePost(updatedPost));
    }
}


const initialState = {posts: {}}

export default function postsReducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case GET_FOLLOWED_POSTS:
            newState = {...state}
            newState.posts = [...action.followedPosts.posts]
            // action.followedPosts.posts.forEach(post => newState.posts[post.id] = post)
            newState.posts.forEach(post => newState[post.id] = post)
            return newState
        case CREATE_POST:
            newState = {...state}
            newState.posts[action.CreatedPost.id] = action.CreatedPost
            return newState
        case DELETE_POST:
            newState = {...state}
            delete newState.posts[action.deletedPost.id]
            return newState
        case UPDATE_POST:
            newState = {...state}
            newState.posts[action.updatedPost.id] = action.updatedPost
            return newState
        default:
            return state
    }

}