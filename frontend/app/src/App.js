import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Components
import Header from './components/Header';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserProfile from './screens/UserProfile';
import TenantManager from './screens/TenantManager';

const App = () => {
  const { userInfo } = useSelector((state) => state.userLogin || {});

  return (
    <>
      <Header />

      <main className="py-4">
        <Container>
          <Routes>
            {/* Default route: redirect to tenants if logged in, else to login */}
            <Route
              path="/"
              element={
                userInfo ? <Navigate to="/tenants" replace /> : <Navigate to="/login" replace />
              }
            />

            {/* Public routes */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* All screens accessible directly */}
            <Route path="/tenants" element={<TenantManager />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
