import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const ACTIVITY_TYPES = [
  { value: "RUNNING", label: "Running", icon: <DirectionsRunIcon />, color: "#ff6b6b" },
  { value: "WALKING", label: "Walking", icon: <DirectionsWalkIcon />, color: "#51cf66" },
  { value: "CYCLING", label: "Cycling", icon: <DirectionsBikeIcon />, color: "#339af0" },
  { value: "SWIMMING", label: "Swimming", icon: <PoolIcon />, color: "#22b8cf" },
  { value: "WEIGHT_TRAINING", label: "Weight Training", icon: <FitnessCenterIcon />, color: "#cc5de8" },
  { value: "YOGA", label: "Yoga", icon: <SelfImprovementIcon />, color: "#ff922b" },
  { value: "HIIT", label: "HIIT", icon: <DirectionsRunIcon />, color: "#f03e3e" },
  { value: "CARDIO", label: "Cardio", icon: <FitnessCenterIcon />, color: "#e64980" },
  { value: "STRETCHING", label: "Stretching", icon: <SelfImprovementIcon />, color: "#74c0fc" },
  { value: "OTHER", label: "Other", icon: <FitnessCenterIcon />, color: "#868e96" },
];

const ActivityForm = ({ onActivityAdded }) => {
  const { token } = useSelector((state) => state.auth);
  const [activityType, setActivityType] = useState("RUNNING");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!duration || !calories) {
      setSnackbar({
        open: true,
        message: "Please fill all fields!",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/activities", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: activityType,
          duration: parseInt(duration),
          caloriesBurned: parseInt(calories),
          startTime: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Activity added! AI is analyzing...",
          severity: "success",
        });
        setDuration("");
        setCalories("");
        if (onActivityAdded) onActivityAdded();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error adding activity!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          mb: 4,
          border: "1px solid #e0e0e0",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <AddIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Log New Activity
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Activity Type */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Activity Type"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                >
                  {ACTIVITY_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Box sx={{ color: type.color, display: "flex" }}>
                          {type.icon}
                        </Box>
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Duration */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              {/* Calories */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Calories Burned"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    height: 56,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: 15,
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5a67d8, #6b46c1)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ActivityForm;