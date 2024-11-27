import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const TeacherDashboard = () => {
    const [attendance, setAttendance] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchAttendance();
        fetchStudents();
    }, []);

    const fetchAttendance = async () => {
        try {
            const { data } = await API.get('/teacher/attendance');
            setAttendance(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStudents = async () => {
        try {
            const { data } = await API.get('/teacher/students');
            setStudents(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className='row mx-0'>
                <div className='col'>
                    <div className='row'>
                        <div className='col-6 mx-auto my-5'>
                            <h2 className='my-5'>Teacher Dashboard</h2>
                            <h3 className='my-3'>Attendance Records</h3>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Selfie</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.map((record) => (
                                        <tr key={record._id}>
                                            <td>{record.studentName}</td>
                                            <td>{new Date(record.date).toLocaleDateString()}</td>
                                            <td>{new Date(record.date).toLocaleTimeString()}</td>
                                            <td>
                                                <img src={record.selfie} alt="Selfie" width="50" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <h3 className='mt-5 mb-3'>Student Profiles</h3>
                            <ul>
                                {students.map((student) => (
                                    <li key={student._id}>
                                        {student.name} - {student.email}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherDashboard;
