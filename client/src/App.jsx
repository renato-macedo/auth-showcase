import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { refreshToken, loading } = useContext(AuthContext);

  useEffect(() => {
    //setTimeout(refreshToken, 1000 * 60);
    refreshToken();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div
          className="spinner-border"
          role="status"
          style={{ width: '6rem', height: '6rem', marginTop: '10%' }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <Route>
          <h3>Not found</h3>
        </Route>
      </Switch>
    </Router>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
