import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { addHabit } from "../features/habit/habitSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddHabitForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(
        addHabit({
          name,
          frequency,
        })
      );
      toast.success('New Habit Has Been Created')
      setName("");
    } else {
        toast.error("Please Fill All The Fields");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Habbit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Habbit Name"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "weekly" | "daily")}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Habbit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
