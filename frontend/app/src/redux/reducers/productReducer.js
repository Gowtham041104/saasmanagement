import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  
  PRODUCT_BY_TENANT_REQUEST,
  PRODUCT_BY_TENANT_SUCCESS,
  PRODUCT_BY_TENANT_FAIL,
} from '../constants/productConstant';

// Initial state for product list
const productListInitialState = {
  loading: false,
  products: [],
  error: null,
  lastFetch: null
};

// Initial state for product operations
const productInitialState = {
  loading: false,
  success: false,
  product: null,
  error: null
};

// Product List Reducer
export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
      
    case PRODUCT_LIST_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        products: action.payload,
        lastFetch: Date.now()
      };
      
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Product Details Reducer
export const productDetailsReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
      
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
      
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Product Create Reducer
export const productCreateReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
      
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, product: action.payload };
      
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Product Update Reducer
export const productUpdateReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };
      
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, product: action.payload };
      
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Product Delete Reducer
export const productDeleteReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true, error: null };
      
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
      
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Products by Tenant Reducer
export const productsByTenantReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case PRODUCT_BY_TENANT_REQUEST:
      return { ...state, loading: true, error: null };
      
    case PRODUCT_BY_TENANT_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        products: action.payload,
        lastFetch: Date.now()
      };
      
    case PRODUCT_BY_TENANT_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};
