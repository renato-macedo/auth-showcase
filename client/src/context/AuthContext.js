import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { useHistory, useLocation } from 'react-router-dom';

const AuthContext = createContext();
export { AuthContext };

const initialState = {
  isAuthenticated: false,
  token: '',
  data: [],
  error: ''
};

export default function AuthProvider(props) {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/home' } };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { isAuthenticated, token, data, error } = state;

  async function login({ email, password, remember }) {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember })
    });

    const data = await response.json();

    if (data.token) {
      dispatch({
        type: 'AUTH',
        payload: data.token
      });
      history.replace(from);
    }
  }

  async function getData() {
    const response = await fetch('http://localhost:8080/user', {
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
      await refreshToken();
    }
  }

  async function logout() {
    await fetch('http://localhost:8080/logout');
    dispatch({
      type: 'LOGOUT'
    });
  }

  async function refreshToken() {
    const response = await fetch('http://localhost:8080/token');

    const data = await response.json();

    if (data.error) {
      dispatch({
        type: 'ERROR',
        payload: data.error + ' Logging out'
      });
      setTimeout(logout, 2000);
    }

    if (data.token) {
      dispatch({
        type: 'AUTH',
        payload: data.token
      });
    }
  }
  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, getData, data, error, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
