import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from "./ActionType";
import { Dispatch } from "redux"; // Import Dispatch type for TypeScript

// Define UserData interface for type-checking
interface UserData {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string; // Added confirm_password field
}

// Action to register a new user
export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    // Check if password and confirm_password match before proceeding
    if (userData.password !== userData.confirm_password) {
        const errorMessage = "Passwords do not match.";
        console.log(errorMessage);
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        return;
    }

    const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

    try {
        const response = await axios.post(`${baseUrl}/register/`, {
            full_name: userData.full_name,
            email: userData.email,
            password: userData.password
        });

        const user = response.data;
        console.log(user);

        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);
        
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.error(error);
    }
};

// Action to log in an existing user
export const login = (userData: Omit<UserData, "confirm_password">) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

    try {
        const response = await axios.post(`${baseUrl}/login/`, {
            email: userData.email,
            password: userData.password
        });

        const user = response.data;
        console.log(user);

        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
        localStorage.setItem("jwt", user.jwt);
        
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
        console.error(error);
    }
};

// Action to get user profile
export const getUser = (jwt: string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

    try {
        const response = await axios.get(`${baseUrl}/profile/`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        const user = response.data;
        console.log(user);

        dispatch({ type: GET_USER_SUCCESS, payload: user });
        
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
        console.error(error);
    }
};
