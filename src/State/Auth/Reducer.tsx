// src/State/Auth/Reducer.tsx
import { 
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT, // Import LOGOUT action type
} from "./ActionType";

// Define the user type
export interface User {
  full_name: string;
  email: string;
  // Add any other properties the user object should have
}

// Define the shape of your state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  jwt: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};

// Define the action type
interface Action {
  type: string;
  payload?: any;
}

// Reducer function
const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

    case REGISTER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        error: null, 
        jwt: action.payload // Assuming registration returns a jwt
      };

    case LOGIN_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        error: null, 
        jwt: action.payload.jwt, // Save jwt from login
        user: action.payload.user || null // Save user info if provided
      };

    case GET_USER_SUCCESS:
      return { 
        ...state, 
        user: action.payload, // Update user data from the fetched payload
        loading: false, 
        error: null 
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload // Set the error message from the payload
      };

    case LOGOUT:
      return { 
        ...initialState // Reset to initial state, clearing user and jwt
      };

    default:
      return state;
  }
};

export default authReducer;
