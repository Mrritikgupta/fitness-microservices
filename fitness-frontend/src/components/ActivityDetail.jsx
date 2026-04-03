import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ACTIVITY_TYPES = [
  { value: "RUNNING", icon: <DirectionsRunIcon />, color: "#ff6b6b" },
  { value: "WALKING", icon: <DirectionsWalkIcon />, color: "#51cf66" },
  { value: "CYCLING", icon: <DirectionsBikeIcon />, color: "#339af0" },
  { value: "SWIMMING", icon: <PoolIcon />, color: "#22b8cf" },
  { value: "WEIGHT_TRAINING", icon: <FitnessCenterIcon />, color: "#cc5de8" },
  { value: "YOGA", icon: <SelfImprovementIcon />, color: "#ff922b" },
  { value: "HIIT", icon: <DirectionsRunIcon />, color: "#f03e3e" },
  { value: "CARDIO", icon: <FitnessCenterIcon />, color: "#e64980" },
  { value: "STRETCHING", icon: <SelfImprovementIcon />, color: "#74c0fc" },
  { value: "OTHER", icon: <FitnessCenterIcon />, color: "#868e96" },
];

const getActivityColor = (type) => {
  const found = ACTIVITY_TYPES.find((a) => a.value === type);
  return found ? found.color : "#868e96";
};

const getActivityIcon = (type) => {
  const found = ACTIVITY_TYPES.find((a) => a.value === type);
  return found ? found.icon : <FitnessCenterIcon />;
};

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(true);

  useEffect(() => {
    fetchActivityDetail();
    fetchRecommendation();
  }, [id]);

  const fetchActivityDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/activities/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setActivity(data);
      }
    } catch (error) {
      console.error("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendation = async () => {
    setRecLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/recommendations/activity/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecommendation(data);
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    } finally {
      setRecLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: "#667eea" }} />
      </Box>
    );
  }

  const color = getActivityColor(activity?.type);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/activities")}
        sx={{
          mb: 3, textTransform: "none", color: "#667eea",
          "&:hover": { bgcolor: "#f0f0ff" },
        }}
      >
        Back to Activities
      </Button>

      <Grid container spacing={3}>

        {/* LEFT - Activity Details Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              border: `2px solid ${color}30`,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            {/* Color Top Bar */}
            <Box sx={{ height: 6, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />

            <CardContent sx={{ p: 3 }}>
              {/* Icon + Type */}
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: 2,
                  bgcolor: `${color}15`,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", color: color,
                  fontSize: 28,
                }}>
                  {getActivityIcon(activity?.type)}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ color }}>
                    {activity?.type}
                  </Typography>
                  <Chip
                    icon={<AutoAwesomeIcon sx={{ fontSize: "13px !important" }} />}
                    label="AI Analyzed"
                    size="small"
                    sx={{
                      fontSize: 11, bgcolor: "#f3e8ff",
                      color: "#7c3aed",
                      "& .MuiChip-icon": { color: "#7c3aed" },
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 2.5 }} />

              {/* Stats */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{
                    p: 2, borderRadius: 2,
                    bgcolor: "#f8f9fa", textAlign: "center"
                  }}>
                    <AccessTimeIcon sx={{ color: "#667eea", mb: 0.5 }} />
                    <Typography variant="h5" fontWeight={700}>
                      {activity?.duration || "--"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Minutes
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{
                    p: 2, borderRadius: 2,
                    bgcolor: "#fff5f5", textAlign: "center"
                  }}>
                    <LocalFireDepartmentIcon sx={{ color: "#ff6b6b", mb: 0.5 }} />
                    <Typography variant="h5" fontWeight={700}>
                      {activity?.caloriesBurned || "--"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Calories
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Date */}
              {activity?.startTime && (
                <Box display="flex" alignItems="center" gap={1} mt={2.5}
                  sx={{ p: 1.5, bgcolor: "#f8f9fa", borderRadius: 2 }}>
                  <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(activity.startTime).toLocaleString()}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT - AI Recommendation */}
        <Grid item xs={12} md={8}>
          {recLoading ? (
            <Box display="flex" justifyContent="center"
              alignItems="center" minHeight={300}
              sx={{ border: "1px solid #e0e0e0", borderRadius: 3 }}>
              <Box textAlign="center">
                <CircularProgress sx={{ color: "#667eea", mb: 2 }} />
                <Typography color="text.secondary">
                  Loading AI recommendations...
                </Typography>
              </Box>
            </Box>
          ) : !recommendation ? (
            <Alert
              severity="info"
              icon={<AutoAwesomeIcon />}
              sx={{ borderRadius: 3 }}
            >
              AI recommendation is being generated. Please check back in a moment!
            </Alert>
          ) : (
            <Box display="flex" flexDirection="column" gap={2.5}>

              {/* Analysis Card */}
              {recommendation.recommendation && (
                <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <AutoAwesomeIcon sx={{ color: "#667eea" }} />
                      <Typography variant="h6" fontWeight={600}>
                        AI Analysis
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8, whiteSpace: "pre-line" }}
                    >
                      {recommendation.recommendation}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Improvements Card */}
              {recommendation.improvements?.length > 0 && (
                <Card elevation={0} sx={{
                  border: "1px solid #e0e0e0", borderRadius: 3,
                  borderLeft: "4px solid #667eea"
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <TrendingUpIcon sx={{ color: "#667eea" }} />
                      <Typography variant="h6" fontWeight={600}>
                        Areas to Improve
                      </Typography>
                    </Box>
                    <List dense disablePadding>
                      {recommendation.improvements.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 18, color: "#667eea" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: "body2",
                              color: "text.secondary",
                              lineHeight: 1.6,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions Card */}
              {recommendation.suggestions?.length > 0 && (
                <Card elevation={0} sx={{
                  border: "1px solid #e0e0e0", borderRadius: 3,
                  borderLeft: "4px solid #ff922b"
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <LightbulbIcon sx={{ color: "#ff922b" }} />
                      <Typography variant="h6" fontWeight={600}>
                        Next Workout Suggestions
                      </Typography>
                    </Box>
                    <List dense disablePadding>
                      {recommendation.suggestions.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 18, color: "#ff922b" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: "body2",
                              color: "text.secondary",
                              lineHeight: 1.6,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}

              {/* Safety Card */}
              {recommendation.safety?.length > 0 && (
                <Card elevation={0} sx={{
                  border: "1px solid #e0e0e0", borderRadius: 3,
                  borderLeft: "4px solid #51cf66"
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <SecurityIcon sx={{ color: "#51cf66" }} />
                      <Typography variant="h6" fontWeight={600}>
                        Safety Guidelines
                      </Typography>
                    </Box>
                    <List dense disablePadding>
                      {recommendation.safety.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 18, color: "#51cf66" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: "body2",
                              color: "text.secondary",
                              lineHeight: 1.6,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}

            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivityDetail;