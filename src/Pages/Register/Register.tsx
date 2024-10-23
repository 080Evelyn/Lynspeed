import axios from "axios";
import { 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS 
} from "./ActionType";
import { Dispatch } from "redux"; // Import Dispatch type if using TypeScript

interface UserData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string; // Added confirmPassword field
}

export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    // Check if password and confirmPassword match before proceeding
    if (userData.password !== userData.confirmPassword) {
        const errorMessage = "Passwords do not match.";
        console.log(errorMessage);
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        return;
    }

    const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

    try {
        const response = await axios.post(`${baseUrl}/register/`, {
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password
        });

        const user = response.data;
        console.log(user);

        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
        console.log(error);
    }
};

export const login = (userData: Omit<UserData, "confirmPassword">) => async (dispatch: Dispatch) => {
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
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        console.log(error);
    }
};
