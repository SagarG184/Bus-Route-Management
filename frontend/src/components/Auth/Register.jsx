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
        width: '100%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: 48
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

function Register() {
    const classes = useStyles();
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/register`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                history.push('/dashboard');
            } else {
                setError('Invalid response from server');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(
                err.response?.data?.message ||
                'An error occurred during registration. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth={false} className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create Account
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
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
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
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
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
                            'Sign Up'
                        )}
                    </Button>
                    <Typography align="center">
                        <Link to="/login" className={classes.link}>
                            Already have an account? Sign In
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
}

export default Register;
