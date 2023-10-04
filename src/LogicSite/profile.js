import Cookies from "js-cookie";
import axios from "axios";


import {LOAD_USER_PROFILE_SUCCESS, LOAD_USER_PROFILE_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, initialState} from "./types";

export const load_user = async () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get('http://127.0.0.1:8000/profile', config);

        await console.log("LOAD_USER", res.data)
        if (res.data.error) {
            return {type: LOAD_USER_PROFILE_FAIL, payload: null}
        } else {
            console.log('DATA', res.data)
            return {type: LOAD_USER_PROFILE_SUCCESS, payload: res.data}
        }
    } catch (err) {
        return {type: LOAD_USER_PROFILE_FAIL, payload: null}
    }
};

