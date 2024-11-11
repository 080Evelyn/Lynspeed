import axios from "axios";
import { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./ActionType";

// Define types for API response data
interface UserData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface ApiError {
  message: string;
  status: number;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  // Add any other fields returned by your API for the user profile
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
      password: userData.password,
    });

    const user = response.data; 
    console.log(user);

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);

  } catch (error: any) {
    const errorMessage: ApiError = {
      message: error.response?.data?.message || "Registration failed",
      status: error.response?.status || 500,
    };
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
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
      password: userData.password,
    });

    const user = response.data; 
    console.log(user);

    dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);

  } catch (error: any) {
    const errorMessage: ApiError = {
      message: error.response?.data?.message || "Login failed",
      status: error.response?.status || 500,
    };
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
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
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user: UserProfile = response.data;
    console.log(user);

    dispatch({ type: GET_USER_SUCCESS, payload: user });

  } catch (error: any) {
    const errorMessage: ApiError = {
      message: error.response?.data?.message || "Failed to fetch user",
      status: error.response?.status || 500,
    };
    dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    console.error(error);
  }
};
