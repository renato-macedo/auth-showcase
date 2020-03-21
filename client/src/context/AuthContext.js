import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const AuthContext = createContext();
export { AuthContext };

const initialState = {
  isAuthenticated: false,
  token: '',
  data: [],
  error: '',
  email: '',
  loading: true
};

export default function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { isAuthenticated, token, data, error, loading, email } = state;

  async function login({ email, password, remember }) {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember })
    });

    const data = await response.json();

    if (data.token) {
      dispatch({
        type: 'AUTH',
        payload: data
      });
    }
  }

  async function getData() {
    const response = await fetch('http://localhost:8080/api/user', {
      method: 'GET',
      headers: { Authorization: token }
    });

    const data = await response.json();

    if (data.text) {
      dispatch({
        type: 'DATA',
        payload: data.text
      });
      return;
    }
    if (data.error) {
      await refreshToken(true);
    }
  }

  async function refreshToken(logoutOnError = false) {
    const response = await fetch('http://localhost:8080/api/token');

    const data = await response.json();

    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.error + ' Logging out'
      });
      if (logoutOnError) {
        setTimeout(logout, 2000);
      }

      return;
    }

    if (data.token) {
      dispatch({
        type: 'AUTH',
        payload: data
      });
    }
  }

  async function logout() {
    await fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    dispatch({
      type: 'LOGOUT'
    });
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        isAuthenticated,
        email,
        getData,
        data,
        error,
        logout,
        loading,
        refreshToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
