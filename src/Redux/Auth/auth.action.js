import axios from "axios";
import { API_BASE_URL, api } from "../../config/api";
import {
  GET_PROFILE_FALIURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCESS,
  LOGIN_FALIURE,
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  REGISTER_FALIURE,
  REGISTER_REQUEST,
  REGISTER_SUCESS,
  SEARCH_USER_FALIURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_SUCESS,
  UPDATE_PROFILE_FALIURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCESS,
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log("login", data);
    dispatch({ type: LOGIN_SUCESS, payload: data.jwt });
  } catch (error) {
    console.log("-------------", error);
    dispatch({ type: LOGIN_FALIURE, payload: error });
  }
};

export const registerUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    console.log("register--------", data);
    dispatch({ type: REGISTER_SUCESS, payload: data.jwt });
  } catch (error) {
    console.log("-------------", error);
    dispatch({ type: REGISTER_FALIURE, payload: error });
  }
};
export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
      },
    });

    console.log("Profile--------", data);
    dispatch({ type: GET_PROFILE_SUCESS, payload: data });
  } catch (error) {
    console.log("-------------", error);
    dispatch({ type: GET_PROFILE_FALIURE, payload: error });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const { data } = await api.put(`${API_BASE_URL}/api/user`, reqData
     
    );

    console.log("update--------", data);
    dispatch({ type: UPDATE_PROFILE_SUCESS, payload: data });
  } catch (error) {
    console.log("error-------------", error);
    dispatch({ type: UPDATE_PROFILE_FALIURE, payload: error });
  }
};

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });

  try {
    const { data } = await api.get(`/api/user/search?query=${query}`)
      
    

    console.log("search user--------", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("-------------", error);
    dispatch({ type: SEARCH_USER_FALIURE, payload: error });
  }
};