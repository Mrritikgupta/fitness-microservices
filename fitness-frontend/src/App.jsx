import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { setCredentials } from "./store/authSlice";
import { useDispatch } from "react-redux";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import {
  AppBar, Toolbar, Typography, Box, Button,
  Avatar, Chip, Container
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const ActivitiesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>My Activities</Typography>
        <Typography color="text.secondary" mt={0.5}>
          Log your workout and get AI-powered recommendations
        </Typography>
      </Box>
      <ActivityForm />
      <ActivityList />
    </Container>
  );
};

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        // LOGIN PAGE
        <Box sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Box sx={{
            background: "white", borderRadius: 4, p: 6,
            textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            maxWidth: 400, width: "90%"
          }}>
            <Box sx={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              mx: "auto", mb: 3
            }}>
              <FitnessCenterIcon sx={{ color: "white", fontSize: 40 }} />
            </Box>
            <Typography variant="h4" fontWeight={700} mb={1}>FitTracker AI</Typography>
            <Typography color="text.secondary" mb={4}>
              Track workouts. Get AI recommendations.
            </Typography>
            <Button
              variant="contained" size="large" fullWidth
              startIcon={<LoginIcon />} onClick={() => logIn()}
              sx={{
                py: 1.5, borderRadius: 2, fontSize: 16,
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                "&:hover": { background: "linear-gradient(135deg, #5a67d8, #6b46c1)" }
              }}
            >
              Login with Keycloak
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
          {/* NAVBAR */}
          <AppBar position="sticky" elevation={0} sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          }}>
            <Toolbar>
              <FitnessCenterIcon sx={{ mr: 1.5 }} />
              <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
                FitTracker AI
              </Typography>
              {tokenData && (
                <Chip
                  avatar={<Avatar sx={{ bgcolor: "rgba(255,255,255,0.3)" }}>
                    {tokenData?.given_name?.[0] || "U"}
                  </Avatar>}
                  label={tokenData?.given_name || "User"}
                  sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)", mr: 2 }}
                  variant="outlined"
                />
              )}
              <Button
                color="inherit" startIcon={<LogoutIcon />}
                onClick={() => logOut()}
                sx={{
                  textTransform: "none", borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.5)", px: 2
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>

          {/* ROUTES */}
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={token ? <Navigate to="/activities" replace /> : <div />} />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App;