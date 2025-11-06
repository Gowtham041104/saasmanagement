import { configureStore } from '@reduxjs/toolkit';
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userStatsReducer,
} from './reducers/userReducer';

import {
  tenantListReducer,
  tenantDetailsReducer,
  tenantCreateReducer,
  tenantUpdateReducer,
  tenantDeleteReducer,
} from './reducers/tenantReducer';

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
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userStats: userStatsReducer,

    // Tenant reducers
    tenantList: tenantListReducer,
    tenantDetails: tenantDetailsReducer,
    tenantCreate: tenantCreateReducer,
    tenantUpdate: tenantUpdateReducer,
    tenantDelete: tenantDeleteReducer,
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
