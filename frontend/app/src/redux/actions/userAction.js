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

/**
 * User login action
 * @param {string} email - User email
 * @param {string} password - User password
 */
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { 
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/auth/login', 
      { email, password }, 
      config
    );

    dispatch({ 
      type: USER_LOGIN_SUCCESS, 
      payload: data 
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || 
              error.message ||
              'Login failed. Please try again.',
    });
  }
};

/**
 * User registration action
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 */
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/auth/signup',
      { username, email, password }, // ✅ Corrected here
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Registration failed',
    });
  }
};
/**
 * User logout action
 */
export const logout = () => (dispatch) => {
  // Remove user data from localStorage
  localStorage.removeItem('userInfo');
  
  // Dispatch logout action
  dispatch({ type: USER_LOGOUT });
  
  // Optional: Clear any other user-related data
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
};

/**
 * Get user profile action
 */
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users/profile', config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch profile',
    });
  }
};

/**
 * Update user profile action
 */
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

    const { data } = await axios.put('/api/users/profile', userData, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // Update userInfo in localStorage with new data
    const updatedUserInfo = { ...userInfo, ...data };
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

    // Also update login state
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: updatedUserInfo,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Failed to update profile',
    });
  }
};

/**
 * Get user statistics action
 */
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

    const { data } = await axios.get('/api/users/stats', config);

    dispatch({
      type: USER_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_STATS_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch statistics',
    });
  }
};

// For backward compatibility
export const signup = register;