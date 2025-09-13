import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    makeStyles,
    CircularProgress
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: 48,
        backgroundColor: '#1976d2',
        color: 'white',
        '&:hover': {
            backgroundColor: '#115293',
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    error: {
        marginTop: theme.spacing(2),
        color: theme.palette.error.main
    }
}));

function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

        try {
            const response = await axios.post(
                `${API_URL}/api/auth/login`,
                {
                    emailOrUsername: formData.emailOrUsername,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                history.push('/dashboard');
            } else {
                setError('Invalid response from server');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.status === 400) {
                setError('Invalid email or password');
            } else if (err.response?.status === 403) {
                setError('Access restricted to NIE email addresses only');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (!navigator.onLine) {
                setError('Please check your internet connection');
            } else {
                setError('An error occurred during login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth={false} className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                {error && (
                    <Typography
                        variant="body2"
                        className={classes.error}
                        align="center"
                    >
                        {error}
                    </Typography>
                )}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="emailOrUsername"
                        label="Email or Username"
                        name="emailOrUsername"
                        autoComplete="email"
                        autoFocus
                        value={formData.emailOrUsername}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                    <Typography align="center">
                        <Link to="/register" className={classes.link}>
                            Don't have an account? Sign Up
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
}

export default Login;
