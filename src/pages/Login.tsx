import { useEffect, useState } from "react";
import { Button, TextField, Typography, Container, Paper, Grid, Fade, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Appdispatch } from "../store/store.ts";
import { loginUser, registerUser } from "../reducer/UserSlice.ts";
import { useNavigate } from "react-router";
import { User } from "../models/User.ts";

export function Login() {
    const dispatch = useDispatch<Appdispatch>();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    const toggleRegister = () => setShowRegister(!showRegister);

    const handleRegister = () => {
        const user: User = { username: registerUsername, password: registerPassword };
        dispatch(registerUser(user));
        navigate("/");
    };

    const handleLogin = () => {
        const user: User = { username: loginUsername, password: loginPassword };
        dispatch(loginUser(user));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "5%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Paper elevation={6} sx={{
                padding: 4,
                width: "100%",
                maxWidth: 400,
                borderRadius: 3,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease-in-out",
            }}>
                <Typography variant="h4" align="center" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: "bold", mb: 2, color: "#333" }}>
                    {showRegister ? "Create Account" : "Welcome Back"}
                </Typography>

                {/* Login Form */}
                <Fade in={!showRegister} timeout={500}>
                    <Box sx={{ display: !showRegister ? "block" : "none" }}>
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Username"
                            variant="outlined"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                background: "linear-gradient(135deg, #007bff, #00d4ff)",
                                color: "white",
                                fontWeight: "bold",
                                '&:hover': { background: "linear-gradient(135deg, #0056b3, #0096c7)" }
                            }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </Fade>

                {/* Sign Up Link */}
                <Typography variant="body2" align="center" sx={{
                    mt: 2,
                    color: "primary.main",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" }
                }} onClick={toggleRegister}>
                    {showRegister ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </Typography>

                {/* Registration Form */}
                <Fade in={showRegister} timeout={500}>
                    <Box sx={{ display: showRegister ? "block" : "none", mt: 2 }}>
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Username"
                            variant="outlined"
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                                color: "white",
                                fontWeight: "bold",
                                '&:hover': { background: "linear-gradient(135deg, #b22222, #ff6347)" }
                            }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Box>
                </Fade>
            </Paper>
        </Container>
    );
}
