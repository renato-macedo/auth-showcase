import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AuthProvider from './context/AuthContext';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="//">
            <Login />
          </Route>
          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>

          <Route path="*">
            <h3>Not found</h3>
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

// export default () => (
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );
