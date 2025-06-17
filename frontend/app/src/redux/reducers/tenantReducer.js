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
    TENANT_CREATE_RESET,
} from '../constants/tenantConstant';

// Initial state for tenant list
const tenantListInitialState = {
  loading: false,
  tenants: [],
  error: null,
  lastFetch: null
};

// Initial state for single tenant operations
const tenantInitialState = {
  loading: false,
  success: false,
  tenant: null,
  error: null
};

// Tenant List Reducer
export const tenantListReducer = (state = tenantListInitialState, action) => {
  switch (action.type) {
    case TENANT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
      
    case TENANT_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        tenants: action.payload,
        lastFetch: Date.now()
      };
      
    case TENANT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Tenant Details Reducer
export const tenantDetailsReducer = (state = tenantInitialState, action) => {
  switch (action.type) {
    case TENANT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
      
    case TENANT_DETAILS_SUCCESS:
      return { ...state, loading: false, tenant: action.payload };
      
    case TENANT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Tenant Create Reducer
export const tenantCreateReducer = (state = tenantInitialState, action) => {
  switch (action.type) {
    case TENANT_CREATE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
      
    case TENANT_CREATE_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        success: true, 
        tenant: action.payload 
      };
      
    case TENANT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case TENANT_CREATE_RESET:
      return {};
      
    default:
      return state;
  }
};

// Tenant Update Reducer
export const tenantUpdateReducer = (state = tenantInitialState, action) => {
  switch (action.type) {
    case TENANT_UPDATE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
      
    case TENANT_UPDATE_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        success: true, 
        tenant: action.payload 
      };
      
    case TENANT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Tenant Delete Reducer
export const tenantDeleteReducer = (state = tenantInitialState, action) => {
  switch (action.type) {
    case TENANT_DELETE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
      
    case TENANT_DELETE_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        success: true,
        tenant: null
      };
      
    case TENANT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

