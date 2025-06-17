import { configureStore } from '@reduxjs/toolkit';
import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducer';

import {
  tenantListReducer,
  tenantDetailsReducer,
  tenantCreateReducer,
  tenantUpdateReducer,
  tenantDeleteReducer,
} from './reducers/tenantReducer';

import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  productsByTenantReducer,
} from './reducers/productReducer';

// Load userInfo from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Preload initial state
const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    // User reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,

    // Tenant reducers
    tenantList: tenantListReducer,
    tenantDetails: tenantDetailsReducer,
    tenantCreate: tenantCreateReducer,
    tenantUpdate: tenantUpdateReducer,
    tenantDelete: tenantDeleteReducer,

    // Product reducers
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productsByTenant: productsByTenantReducer,
     productUpdate: productUpdateReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.config', 'payload.request'],
        ignoredPaths: ['userLogin.userInfo'],
      },
    }),
});

export default store;
