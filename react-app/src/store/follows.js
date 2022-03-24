const GET_USER_FOLLOWEDS = 'followers/GET_USER_FOLLOWEDS'
const FOLLOW = 'followers/FOLLOW'
const UNFOLLOW = 'followers/UNFOLLOW'

const getUserFolloweds = (followeds) => ({
    type: GET_USER_FOLLOWEDS,
    followeds
})

const follow = (followedUser) => ({
    type: FOLLOW,
    followedUser
})

const unfollow = (unfollowedUser) => ({
    type: UNFOLLOW,
    unfollowedUser
})

export const getUserFollowedsThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}/followeds`)

    if (response.ok) {
        const followeds = await response.json()
        dispatch(getUserFolloweds(followeds))
    }
}

export const followThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const followedUser = await response.json()
        dispatch(follow(followedUser))
    }
}

export const unfollowThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}/unfollow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        const unfollowedUser = await response.json()
        dispatch(unfollow(unfollowedUser))
    }
}

const initialState = { userFolloweds: [] }

export default function followsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER_FOLLOWEDS:
            newState = { ...state }
            // newState.userFolloweds.forEach(followed => delete newState[followed.id])
            newState.userFolloweds = [...action.followeds.followeds]
            newState.userFolloweds.forEach(followed => newState[followed.id] = followed)
            return newState
        case FOLLOW:
            newState = { ...state }
            // newState.userFolloweds.forEach(followed => delete newState[followed.id])
            newState.userFolloweds = [...newState.userFolloweds, action.followedUser]
            newState.userFolloweds.forEach(followed => newState[followed.id] = followed)
            return newState
        case UNFOLLOW:
            newState = { ...state }
            delete newState[action.unfollowedUser.id]
            return newState
        default:
            return state
    }
}