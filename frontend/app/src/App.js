import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Components
import Header from './components/Header';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TenantScreen from './screens/TenantScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
  const { userInfo } = useSelector((state) => state.user || {});

  return (
    <>
      <Header />

      <main className="py-4">
        <Container>
          <Routes>
            {/* Default route: redirect to dashboard if logged in, else to login */}
            <Route
              path="/"
              element={
                userInfo ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
              }
            />

            {/* Public routes */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* All screens accessible directly */}
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/tenants" element={<TenantScreen />} />
            <Route path="/products" element={<ProductScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
