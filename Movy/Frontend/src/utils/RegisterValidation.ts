export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  interface PasswordValidationResult {
    valid: boolean;
    error?: string;
  }
  
  export const validatePassword = (password: string): PasswordValidationResult => {
    if (password.length < 8) {
      return { valid: false, error: "Password must be at least 8 characters long." };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, error: "Password must contain at least one uppercase letter." };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, error: "Password must contain at least one number." };
    }
    return { valid: true };
  };