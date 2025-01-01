import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "@/utils/apiClient";
import { TextField, Button, Typography, Box } from "@mui/material";
import StatusChip from "@/components/StatusChip";

interface LoginResponse {
    access: string;
    refresh: string;
}

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [status, setStatus] = useState<{
        type: "success" | "error" | "";
        message: string;
    }>({
        type: "",
        message: "",
    });
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const getUsername = async () => {
        if (username === localStorage.getItem("USER") || username === "") {
            setUsername(localStorage.getItem("USER") || "");
        }
        const response = await axios.get(
            `http://127.0.0.1:8000/api/auth/user/?email=${email}`
        );
        if (response.status === 200) {
            localStorage.setItem("USER", response.data[0].username);
            setUsername(response.data[0].username);
        }
    };

    const getUserDetail = async () => {
        const response = await apiClient.get(`auth/user?email=${email}`);
        localStorage.setItem("USER", response.data[0].username);
        localStorage.setItem("ID", response.data[0].id);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ type: "", message: "" }); // Reset status messages
        getUsername();

        try {
            setStatus({ type: "", message: "" }); // Reset status messages
            if (username !== "") {
                const response = await axios.post<LoginResponse>(
                    "http://127.0.0.1:8000/api/auth/login",
                    { username, password }
                );
                localStorage.setItem("TOKEN", response.data.access);
                localStorage.setItem("REFRESH_TOKEN", response.data.refresh);
                setError("");
                setStatus({ type: "success", message: "Login successful!" });
                getUserDetail();
                // Redirect or navigate to home page
                navigate("/");
            } else {
                setStatus({
                    type: "error",
                    message: "No User Found with provided Email",
                });
            }
        } catch (error: any) {
            // Use `any` for generic error handling
            setError("Password is incorrect");
        }
    };

    return (
        <Box className="flex justify-center items-center min-h-screen bg-gray-100">
            <Box className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {status.message && (
                    <StatusChip type={status.type} message={status.message} />
                )}
                <Typography variant="h4" component="h1" className="text-center mb-6">
                    Login
                </Typography>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error !== ""}
                        helperText={error}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" className="text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;
