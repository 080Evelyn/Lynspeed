import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

export const register = (userData: any) => async (dispatch) => {
    dispatch({type:REGISTER_REQUEST})

  const baseUrl = "https://lynspeed.pythonanywhere.com";



  try {
    const response = await axios.post(
      `${baseUrl}/register/`,userData);
    const user = response.data;
    console.log(user);

    dispatch({type:REGISTER_SUCCESS,payload:user.jwt})
  }
  
  catch (error) {
    dispatch({type:REGISTER_FAILURE,payload:error.message})
    console.log(error);
  }
};



export const login = (userData: any) => async (dispatch) => {
    dispatch({type:LOGIN_REQUEST})

  const baseUrl = "https://lynspeed.pythonanywhere.com";



  try {
    const response = await axios.post(
      `${baseUrl}/login/`,userData);
    const user = response.data;
    console.log(user);

    dispatch({type:LOGIN_SUCCESS,payload:user.jwt})
  }
  
  catch (error) {
    dispatch({type:LOGIN_FAILURE,payload:error})
    console.log(error);
  }
};