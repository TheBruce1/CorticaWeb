import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const AttendanceHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const { data } = await API.get('/attendance/history');
            setHistory(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Attendance History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Selfie</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record) => (
                        <tr key={record._id}>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{new Date(record.date).toLocaleTimeString()}</td>
                            <td>
                                <img src={record.selfie} alt="Selfie" width="50" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceHistory;
