import React, { createContext, useState } from 'react';

const AuthContext = createContext();
export { AuthContext };

export default function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  const [error, setError] = useState('');

  async function login({ email, password, remember }) {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember })
    });

    const data = await response.json();

    if (data.token) {
      setToken(data.token);
      setIsAuthenticated(true);
    }
  }

  async function getData() {
    const response = await fetch('http://localhost:8080/user', {
      method: 'GET',
      headers: { Authorization: token }
    });

    const { text, error } = await response.json();
    console.log(text, error);
    if (text) {
      setData([...data, text]);
    }
    if (error) {
      setError(error + ' Logging out');
      setTimeout(logout, 2000);
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setToken('');
  }
  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, getData, data, error, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
