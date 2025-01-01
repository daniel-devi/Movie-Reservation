import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { validateEmail, validatePassword } from "@/utils/RegisterValidation";
import apiClient from "@/utils/apiClient";

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Check if an email exists in the database.
   * @param {string} email The email address to check.
   * @returns {Promise<boolean>} A boolean indicating if the email exists.
   */
  const checkEmailExists = async (email: string): Promise<boolean> => {
    const { data } = await apiClient.get<boolean>(`/auth/check-email?email=${email}`);
    return data;
  };

  const getAuthToken = async (username: string, password: string) => {
    const response = await apiClient.post("token/", {
      username,
      password,
    })
    localStorage.setItem("TOKEN", response.data.access);
    localStorage.setItem("REFRESH_TOKEN", response.data.refresh);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      return;
    }

    const emailExists: { exists: boolean } = await checkEmailExists(email);
    if (emailExists.exists) {
      setEmailError("Email already exists.");
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.error || "");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/register/", {
        email,
        password,
      });

      // Success
      onSuccess();

      localStorage.setItem("USER", response.data.username);
      localStorage.setItem("ID", response.data.id);
      
      // Get auth token
      getAuthToken(response.data.username, password);
    } catch (error: any) {
      setGeneralError(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Box>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          required
        />
      </Box>
      <Box>
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          required
        />
      </Box>
      {generalError && (
        <Typography color="error" variant="body2">
          {generalError}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
