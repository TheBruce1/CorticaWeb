import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/admin/users');
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddTeacher = async () => {
        try {
            await API.post('/admin/teachers', newTeacher);
            alert('Teacher added successfully');
            fetchUsers();
        } catch (err) {
            alert('Failed to add teacher');
        }
    };

    const handleDisableUser = async (userId) => {
        try {
            await API.patch(`/admin/users/${userId}/disable`);
            alert('User access disabled');
            fetchUsers();
        } catch (err) {
            alert('Failed to disable user access');
        }
    };

    return (
        <>
            <div>
                <div className='row mx-0'>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-6 mx-auto my-5'>
                                <h2 className='my-3'>Admin Dashboard</h2>
                                <h3 className='my-3'>Add New Teacher</h3>
                                <input
                                    className='form-control w-50'
                                    type="text"
                                    placeholder="Name"
                                    value={newTeacher.name}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                />
                                <br />
                                <input
                                    className='form-control w-50'
                                    type="email"
                                    placeholder="Email"
                                    value={newTeacher.email}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                />
                                <br />
                                <input
                                    className='form-control w-50'
                                    type="password"
                                    placeholder="Password"
                                    value={newTeacher.password}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                                />
                                <br />
                                <button onClick={handleAddTeacher} className='btn btn-success'>Add Teacher</button>

                                <h3 className='mt-5 mb-2'>All Users</h3>
                                <table className='table table-bordered'>
                                    <thead className='bordered'>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>{user.active ? 'Active' : 'Disabled'}</td>
                                                <td>
                                                    <button onClick={() => handleDisableUser(user._id)}>Disable Access</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
