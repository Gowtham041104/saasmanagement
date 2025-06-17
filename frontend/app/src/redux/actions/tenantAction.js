import axios from 'axios';
import {
  TENANT_LIST_REQUEST,
  TENANT_LIST_SUCCESS,
  TENANT_LIST_FAIL,
  TENANT_CREATE_REQUEST,
  TENANT_CREATE_SUCCESS,
  TENANT_CREATE_FAIL,
  TENANT_UPDATE_REQUEST,
  TENANT_UPDATE_SUCCESS,
  TENANT_UPDATE_FAIL,
  TENANT_DELETE_REQUEST,
  TENANT_DELETE_SUCCESS,
  TENANT_DELETE_FAIL,
  TENANT_DETAILS_REQUEST,
  TENANT_DETAILS_SUCCESS,
  TENANT_DETAILS_FAIL,
} from '../constants/tenantConstant';

// 🔹 List all tenants
export const listTenants = () => async (dispatch) => {
  try {
    dispatch({ type: TENANT_LIST_REQUEST });

    const { data } = await axios.get('/api/tenants');

    dispatch({
      type: TENANT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TENANT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔹 Create a new tenant
export const createTenant = (tenantData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TENANT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error('User authentication required');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const payload = {
      ...tenantData,
      createdBy: userInfo.userId || userInfo._id,
    };

    const { data } = await axios.post('/api/tenants', payload, config);

    dispatch({ type: TENANT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TENANT_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔹 Update a tenant
export const updateTenant = (id, tenantData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TENANT_UPDATE_REQUEST });

    const userInfo = getState()?.userLogin?.userInfo;

    if (!userInfo || !userInfo.token) {
      throw new Error('User not authenticated');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/tenants/${id}`, tenantData, config);
    dispatch({ type: TENANT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TENANT_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
// 🔹 Delete a tenant
export const deleteTenant = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TENANT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error('User not authenticated');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tenants/${id}`, config);

    dispatch({
      type: TENANT_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TENANT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔹 Get details of a single tenant
export const getTenantDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TENANT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error('User not authenticated');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tenants/${id}`, config);

    dispatch({
      type: TENANT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TENANT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
