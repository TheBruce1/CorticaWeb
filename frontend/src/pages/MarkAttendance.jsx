import React, { useState } from 'react';
import API from '../utils/API';

const MarkAttendance = () => {
    const [selfie, setSelfie] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('selfie', selfie);

        try {
            await API.post('/attendance/mark', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Attendance marked successfully');
        } catch (err) {
            alert('Failed to mark attendance');
        }
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setSelfie(e.target.files[0])} />
                <button type="submit">Mark Attendance</button>
            </form>
        </div>
    );
};

export default MarkAttendance;
