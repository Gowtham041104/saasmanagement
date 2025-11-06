import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_STATS_REQUEST,
  USER_STATS_SUCCESS,
  USER_STATS_FAIL,
} from '../constants/userConstants';

const API = process.env.REACT_APP_API_URL;

// ✅ LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `${API}/api/auth/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ REGISTER
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `${API}/api/auth/signup`,
      { username, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

// ✅ GET PROFILE
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/api/users/profile`, config);

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ UPDATE PROFILE
export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API}/api/users/profile`,
      userData,
      config
    );

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    const updatedUser = { ...userInfo, ...data };
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: updatedUser });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ USER STATS
export const getUserStats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_STATS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API}/api/users/stats`, config);

    dispatch({ type: USER_STATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_STATS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const signup = register;
