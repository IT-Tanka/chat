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
    <GoogleOAuthProvider clientId="979750606063-r2ja192qrh4m9ftic4023vk55ulscv0j.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <Header />
          <div className="container main">
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
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
