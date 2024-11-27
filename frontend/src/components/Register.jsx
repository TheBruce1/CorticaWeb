import React, { useState } from 'react';
import API from '../utils/API';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Student', // Default role is Student
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await API.post('/auth/register', formData);
            alert('Registration successful! Please log in.');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <>
            <div className='row mx-0'>
                <div className='col'>
                    <div className='row'>
                        <div className='col-6 mx-auto my-5'>
                            <h2>Register</h2>
                            <form onSubmit={handleSubmit}>
                                <label className='my-2'>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className='form-control'
                                    />
                                </label>
                                <br/>
                                <label className='my-2'>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className='form-control'
                                    />
                                </label>
                                <br/>
                                <label className='my-2'>
                                    Password:
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className='form-control'
                                    />
                                </label>
                                <br/>
                                <label className='my-2'>
                                    Confirm Password:
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className='form-control'
                                    />
                                </label>
                                <br/>
                                <label className='mt-3'>
                                    Role:
                                    <select name="role" value={formData.role} onChange={handleChange} className='form-control'>
                                        <option value="Student">Student</option>
                                        <option value="Teacher">Teacher</option>
                                    </select>
                                </label>
                                {/* <br/> */}
                                <button type="submit" className='btn btn-primary my-2 ms-3'>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
