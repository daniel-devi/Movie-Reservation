import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("ID");
        localStorage.removeItem("USER");
        navigate("/login");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            width="100vw"
            sx={{ backgroundColor: "#f4f6f8" }}
        >
          <Typography variant="h3" color="text.primary" gutterBottom>ReactDJ Project</Typography>
            <Paper
                sx={{
                    padding: "20px 40px",
                    borderRadius: "8px",
                    boxShadow: 3,
                    textAlign: "center",
                    backgroundColor: "#fff",
                    maxWidth: 400,
                    width: "100%",
                }}
            >
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Are you sure you want to logout?
                </Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogout}
                        sx={{ padding: "10px 20px" }}
                    >
                        Logout
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate("/")}
                        sx={{ padding: "10px 20px" }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Logout;
