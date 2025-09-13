import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
