import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadsListPage from './pages/ThreadsListPage';
import ChatPage from './pages/ChatPage';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <AuthProvider> 
          <Header />
          <div className="main">
            <div className="container">
              <Routes>
                <Route path="/" element={<Navigate to="/threads" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/threads"
                  element={<PrivateRoute><ThreadsListPage /></PrivateRoute>}
                />
                <Route
                  path="/threads/:threadId"
                  element={<PrivateRoute><ChatPage /></PrivateRoute>}
                />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;



