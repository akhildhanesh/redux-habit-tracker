import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchHabits } from "../features/habit/habitSlice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStats = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habit
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (habits.length === 0) {
      dispatch(fetchHabits());
    }
  }, [habits.length, dispatch]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((h) => h.completedDates.includes(today)).length;
  };

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak += 1;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const getLongestStreak = () => {
    return Math.max(...habits.map(getStreak));
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits: {habits.length}</Typography>
      <Typography variant="body1">
        Completed Today: {getCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Longest Streak: {getLongestStreak()}
      </Typography>
    </Paper>
  );
};

export default HabitStats;
