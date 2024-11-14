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
  // Add any other fields returned by your API for the user profile
}

// Action to register a new user
export const register = (userData: UserData) => async (dispatch: Dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  if (userData.password !== userData.confirm_password) {
    const errorMessage = "Passwords do not match.";
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

    const { jwt, user } = response.data; // Assuming `jwt` and `user` are in the response
    dispatch({ type: REGISTER_SUCCESS, payload: { jwt, user } });
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user)); // Store user data for persistence

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

  const baseUrl = "https://lynspeed.pythonanywhere.com/api/v1/";

  try {
    const response = await axios.post(`${baseUrl}/login/`, {
      email: userData.email,
      password: userData.password,
    });

    const { jwt } = response.data;
    localStorage.setItem("jwt", jwt);

    // Fetch user profile information after login
    const profileResponse = await axios.get(`${baseUrl}/profile/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user: UserProfile = profileResponse.data;

    // Dispatch loginSuccess to save JWT and user profile in Redux
    dispatch(loginSuccess({ jwt, user }));
    localStorage.setItem("user", JSON.stringify(user)); // Persist user data in localStorage

  } catch (error: any) {
    const errorMessage: ApiError = {
      message: error.response?.data?.message || "Login failed",
      status: error.response?.status || 500,
    };
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    console.error(error);
  }
};

// Action creator for loginSuccess
export const loginSuccess = (payload: { jwt: string; user: UserProfile }) => ({
  type: LOGIN_SUCCESS,
  payload,
});

// Action to get user profile (if needed separately)
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

// Action to log out the user
export const logout = () => (dispatch: Dispatch) => {
  // Clear JWT and user data from localStorage
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");

  // Dispatch LOGOUT action to reset user state in Redux
  dispatch({ type: LOGOUT });
};

// Initializer function to check localStorage and populate Redux store
export const initializeAuth = () => (dispatch: Dispatch) => {
  const jwt = localStorage.getItem("jwt");
  const user = localStorage.getItem("user");

  if (jwt && user) {
    const parsedUser: UserProfile = JSON.parse(user);
    dispatch(loginSuccess({ jwt, user: parsedUser }));
  }
};
