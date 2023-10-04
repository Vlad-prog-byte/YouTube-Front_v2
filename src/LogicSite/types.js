import channels from "../components/Channels";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAIL = "LOGOUT_FAIL"

export const AUTHENTICATED_SUCCESS = "AUTHENTICATED_SUCCESS"
export const AUTHENTICATED_FAIL = "AUTHENTICATED_FAIL"
export const LOAD_USER_PROFILE_SUCCESS = "LOAD_USER_PROFILE_SUCCESS"
export const LOAD_USER_PROFILE_FAIL = "LOAD_USER_PROFILE_FAIL"

export const CHANNELS_SUCCESS = "CHANNELS_SUCCESS"
export const CHANNELS_FAIL = "CHANNELS_FAIL"


export const SEARCH_SUCCESS = "SEARCH_SUCCESS"
export const SEARCH_FAIL = "SEARCH_FAIL"

export const CHANNEL_SUCCESS = "CHANNEL_SUCCESS"

export const LIKE_DISLIKE_SUCCESS = "LIKE_DISLIKE_SUCCESS"
export const LIKE_DISLIKE_FAIL = "LIKE_DISLIKE_FAIL"

export const GET_VIDEO_MANAGER_SUCCESS = "GET_VIDEO_MANAGER_SUCCESS"

export const initialState = {
    // isLoaded: false,
    // error : '',
    // items : [],
    // search : [],
    // id: -1,
    // channel : [],
    id : -1,
    isAuthenticated: null,
    username : '',
    profile : null,
    channels : [],
    search : [],
    channel: [],
    isManager: null,
    getVideoManager: null
}


export const reducer = (state, action) => {
// type, payload
    const { type, payload } = action
    console.log("REDUCER", type)
    switch(type) {
        case CHANNEL_SUCCESS:
            return {
                ...state,
                channel: action.payload
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                search : action.payload
            }
        case CHANNELS_SUCCESS:
            return {
                ...state,
                channels: payload
            }
        case CHANNELS_FAIL:
            return state
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                profile: null
            }
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isManager: action.payload.isManager,
                username: action.payload.username,
                id : action.payload.id
            }
        case REGISTER_SUCCESS:
            console.log("REGISTER_SUCCESS")
            return {
                ...state,
                isAuthenticated: false
            }
        case SEARCH_FAIL:
        case REGISTER_FAIL:
            return state
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS ID", action)
            return {
                ...state,
                id: payload[0],
                username: payload[1],
                isAuthenticated: true,
                isManager: payload[2]
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                isManager: false
            }
        case GET_VIDEO_MANAGER_SUCCESS:
            return {
                ...state,
                getVideoManager: action.payload
            }
        default:
            return state
    }
}