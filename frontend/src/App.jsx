import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
);

export default App;
