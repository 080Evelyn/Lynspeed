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
    // Define properties according to your user data structure
    email: string;
    password: string;
    // Add more fields as needed
}

export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

    try {
        const response = await axios.post(`${baseUrl}/register/`, userData);
        const user = response.data;
        console.log(user);

        dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload:error });
        console.log(error);
    }
};

export const login = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

    try {
        const response = await axios.post(`${baseUrl}/login/`, userData);
        const user = response.data;
        console.log(user);

        dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error }); // Using error.message for consistency
        console.log(error);
    }
};
