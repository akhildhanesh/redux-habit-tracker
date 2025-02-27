import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Box,
  Button,
  Grid2,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../features/habit/habitSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import HabitStats from "./HabitStats";

const HabitList = () => {
  const { habits } = useSelector((state: RootState) => state.habit);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
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
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      <ToastContainer />
      {habits.length ? (
        habits.map((habit) => {
          return (
            <Paper
              key={habit.id}
              elevation={2}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textTransform: "uppercase" }}
                >
                  {habit.frequency}
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircle />}
                    onClick={() => {
                      dispatch(
                        toggleHabit({
                          id: habit.id,
                          date: today,
                        })
                      );
                    }}
                  >
                    {habit.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      dispatch(
                        removeHabit({
                          id: habit.id,
                        })
                      );
                      toast("Habit Removed Successfully");
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Current Streak: {getStreak(habit)} days
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(getStreak(habit) / 30) * 100}
                  sx={{ mt: 5 }}
                />
              </Box>
            </Paper>
          );
        })
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>No Habits to Show</h3>
          <span style={{ color: "blue" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Click Here To Add Habit
            </Link>
          </span>
        </div>
      )}
      <HabitStats />
    </Box>
  );
};

export default HabitList;
