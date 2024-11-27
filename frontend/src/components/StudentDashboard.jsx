import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const StudentDashboard = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [selfie, setSelfie] = useState(null);

    useEffect(() => {
        fetchAttendanceHistory();
    }, []);

    const fetchAttendanceHistory = async () => {
        try {
            const { data } = await API.get('/attendance/history');
            setAttendanceHistory(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleMarkAttendance = async () => {
        const formData = new FormData();
        formData.append('selfie', selfie);

        try {
            await API.post('/attendance/mark', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Attendance marked successfully');
            fetchAttendanceHistory();
        } catch (err) {
            alert('Failed to mark attendance');
        }
    };

    return (
        <>
            <div className='row mx-0'>
                <div className='col'>
                    <div className='row'>
                        <div className='col-6 mx-auto my-5'>
                            <h2 className='my-3'>Student Dashboard</h2>
                            <h3 className='my-3'>Mark Attendance</h3>
                            <input type="file" onChange={(e) => setSelfie(e.target.files[0])} className='form-control'/>
                            <br/>
                            <button onClick={handleMarkAttendance} className='btn btn-success'>Mark Attendance</button>

                            <h3 className='mt-5 mb-3'>Attendance History</h3>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Selfie</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceHistory.map((entry) => (
                                        <tr key={entry._id}>
                                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                                            <td>{new Date(entry.date).toLocaleTimeString()}</td>
                                            <td>
                                                <img src={entry.selfie} alt="Selfie" width="50" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
