import React, { useContext } from 'react';

import './App.css';
import Login from './components/Login';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Home from './components/Home';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Home />;
  }
  return <Login />;
}

function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
export default AppWithProvider;
