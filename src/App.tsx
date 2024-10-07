import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Typography } from '@mui/material'
import AddHabitForm from './components/AddHabitForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HabitList from './components/HabitList'
import ResponsiveAppBar from './components/AppBar'

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Container maxWidth="md">
        <Typography
          component="h1"
          align="center"
          variant="h2"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            fontFamily: "Merriweather",
          }}
        >
          Habbit Tracker
        </Typography>
        <Routes>
          <Route path="/" element={<AddHabitForm />} />
          <Route path="/show" element={<HabitList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App
