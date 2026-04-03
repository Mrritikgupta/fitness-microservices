import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  Typography,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";

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

const getActivityIcon = (type) => {
  const found = ACTIVITY_TYPES.find((a) => a.value === type);
  return found ? found.icon : <FitnessCenterIcon />;
};

const getActivityColor = (type) => {
  const found = ACTIVITY_TYPES.find((a) => a.value === type);
  return found ? found.color : "#868e96";
};

const ActivityList = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress sx={{ color: "#667eea" }} />
      </Box>
    );
  }

  if (activities.length === 0) {
    return (
      <Box
        textAlign="center"
        py={8}
        sx={{ border: "2px dashed #e0e0e0", borderRadius: 3 }}
      >
        <FitnessCenterIcon sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
        <Typography color="text.secondary">
          No activities yet. Log your first workout!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Recent Activities
        </Typography>
        <Chip
          label={`${activities.length} total`}
          size="small"
          sx={{ bgcolor: "#f0f0f0" }}
        />
      </Box>

      {/* Grid */}
      <Grid container spacing={2}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  borderColor: getActivityColor(activity.type),
                },
              }}
            >
              <CardActionArea
                onClick={() =>
                  navigate(`/activities/${activity.activityId}`)
                }
                sx={{ p: 2.5 }}
              >
                {/* Top Row */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: `${getActivityColor(activity.type)}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: getActivityColor(activity.type),
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Box>
                  <Chip
                    icon={
                      <AutoAwesomeIcon
                        sx={{ fontSize: "14px !important" }}
                      />
                    }
                    label="AI Ready"
                    size="small"
                    sx={{
                      fontSize: 11,
                      bgcolor: "#f3e8ff",
                      color: "#7c3aed",
                      "& .MuiChip-icon": { color: "#7c3aed" },
                    }}
                  />
                </Box>

                {/* Activity Name */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: getActivityColor(activity.type), mb: 1.5 }}
                >
                  {activity.type}
                </Typography>

                <Divider sx={{ mb: 1.5 }} />

                {/* Stats */}
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <AccessTimeIcon
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {activity.duration || "--"} min
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <LocalFireDepartmentIcon
                      sx={{ fontSize: 16, color: "#ff6b6b" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {activity.caloriesBurned || "--"} kcal
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActivityList;