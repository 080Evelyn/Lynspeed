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
} from "./ActionType";

// Define the shape of your state
interface AuthState {
  user: string | null; // UserProfile defined above
  loading: boolean;
  error: string |  null; // Store the error message or ApiError type
  jwt: string | null; // JWT is stored as a string
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
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case GET_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
