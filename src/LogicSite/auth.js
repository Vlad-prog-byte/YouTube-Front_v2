import axios from "axios";
import Cookies from 'js-cookie';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    CHANNELS_FAIL,
    CHANNELS_SUCCESS, LIKE_DISLIKE_SUCCESS, LIKE_DISLIKE_FAIL,
    GET_VIDEO_MANAGER_SUCCESS
} from "./types";
import data from "bootstrap/js/src/dom/data";

export const getUsers = async () => {
    const res = await axios.get('http://localhost:8000/users');
    return {type: CHANNELS_SUCCESS, payload: res.data}
}

// export const like = async(body) => {
//     const config = {
//         withCredentials: true,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'X-CSRFToken': Cookies.get('csrftoken')
//         }
//     };
//     console.log("Body", body)
//     try {
//         const res = await axios.post('http://127.0.0.1:8000/api/likeDislike', body, config)
//         if (res.data.error) {
//             console.log("REGISTER_FAIL")
//             return REGISTER_FAIL
//         } else {
//             console.log("REGISTER_SUCCESS")
//             return REGISTER_SUCCESS
//         }
//     } catch (err) {
//         console.log("Error", err)
//         return REGISTER_FAIL
//     }
// };

export const deleteUser = async (data) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = data;


    try {
        const res = await axios.post('http://127.0.0.1:8000/api/Accounts/delete', body, config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
}



export const deleteVideoManager = async (data) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = data;


    try {
        const res = await axios.post('http://127.0.0.1:8000/api/isPublished/delete', body, config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
}


export const postVideoManager = async (data) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = data;

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/manager/isPublished', body, config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
}


export const getVideoManager = async () => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    try {
        const res = await axios.get('http://127.0.0.1:8000/api/manager/isPublished', config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
}

export const postPhoto = async (data) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = data;

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/newPhoto', body, config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
};

export const postVideo = async (data) => {
    const config = {
        withCredentials: true,
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = data;

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/newVideo', body, config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
};


export const deleteLikeDislike = async (data) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = JSON.stringify({...data});

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/likeDislike/delete', body, config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
}

export const likeDislike = async (data) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            'sessionid': Cookies.get('sessionid')
        }
    };

    const body = JSON.stringify({...data});

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/likeDislike', body, config)

        if (res.data.success) {
            return res.data
        } else {
            return res.data
        }
    } catch(err) {
        return err.data
    }
};




export const checkAuthenticated = async () => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://localhost:8000/authenticated`, config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            return  AUTHENTICATED_FAIL
        }
        else if (res.data.isAuthenticated === 'success') {
            console.log(res.data)
            return {type: AUTHENTICATED_SUCCESS, payload: res.data}
        }
        else {
            return  AUTHENTICATED_FAIL
        }
    } catch(err) {
        return  AUTHENTICATED_FAIL
    }
};

export const register = async(username, password, re_password) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password, re_password });

    console.log("Body", body)
    try {
        const res = await axios.post('http://localhost:8000/auth/register', body, config)
        if (res.data.error) {
            console.log("REGISTER_FAIL")
            return REGISTER_FAIL
        } else {
            console.log("REGISTER_SUCCESS")
            return REGISTER_SUCCESS
        }
    } catch (err) {
        console.log("Error", err)
        return REGISTER_FAIL
    }
};

export const login = async (username, password) => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post('http://localhost:8000/auth/login', body, config)

        if (res.data.success) {
            return {type: LOGIN_SUCCESS, payload: [res.data.userProfileId, res.data.username, res.data.isManager]}
        } else {
            return LOGIN_FAIL
        }
    } catch(err) {
        return LOGIN_FAIL
    }
};

export const logout = async ()  => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({});

    try {
        const res = await axios.post(`http://localhost:8000/auth/logout`, body, config);

        if (res.data.success) {
            return LOGOUT_SUCCESS
        } else {
            return LOGOUT_FAIL
        }
    } catch(err) {
        return LOGOUT_FAIL
    }
};