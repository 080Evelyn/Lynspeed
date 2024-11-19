import axios from "axios";
import { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "./ActionType";

// Define types for API response data
interface UserData {
  full_name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

interface ApiError {
  message: string;
  status: number;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
}

// Base API URL
const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

// Action to register a new user
export const register = (userData: UserData) => async (dispatch: Dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  if (userData.password !== userData.confirm_password) {
    const errorMessage = "Passwords do not match.";
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    return;
  }

  try {
    const response = await axios.post(`${baseUrl}/register/`, {
      full_name: userData.full_name,
      email: userData.email,
      password: userData.password,
    });

    const { jwt, user } = response.data;
    dispatch({ type: REGISTER_SUCCESS, payload: { jwt, user } });
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));

  } catch (error: any) {
    const errorMessage: ApiError = {
      message: error.response?.data?.message || "Registration failed",
      status: error.response?.status || 500,
    };
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    console.error(error);
  }
};

// Action to log in an existing user and fetch profile data
export const login = (userData: Omit<UserData, "confirm_password">) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${baseUrl}/login/`, {
      email: userData.email,
      password: userData.password,
    });

    const { jwt } = response.data;
    localStorage.setItem("jwt", jwt);

    const profileResponse = await axios.get(`${baseUrl}/profile/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user: UserProfile = profileResponse.data;
    dispatch(loginSuccess({ jwt, user }));
    localStorage.setItem("user", JSON.stringify(user));

  } catch (error: any) {
    const errorMessage: ApiError = {
      message: error.response?.data?.message || "Login failed",
      status: error.response?.status || 500,
    };
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    console.error(error);
  }
};

// Action creator for login success
export const loginSuccess = (payload: { jwt: string; user: UserProfile }) => ({
  type: LOGIN_SUCCESS,
  payload,
});

// Initialize authentication state on app load
export const initializeAuth = () => (dispatch: Dispatch) => {
  const jwt = localStorage.getItem("jwt");
  const user = localStorage.getItem("user");

  if (jwt && user) {
    const parsedUser: UserProfile = JSON.parse(user);
    dispatch(loginSuccess({ jwt, user: parsedUser }));
  }
};

// Action to log out the user
export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT });
};
