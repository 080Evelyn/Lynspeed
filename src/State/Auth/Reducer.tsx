import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

// Define the shape of your state
interface AuthState {
  user: any; // You can define a more specific type if you have user data structure
  loading: boolean;
  error: string | null; // Assuming error is a string
  jwt: string | null; // Assuming jwt is a string
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
  payload?: any; // Use a more specific type if you know the structure of payload
}

// Reducer function
const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
