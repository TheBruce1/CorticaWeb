import React, { useState } from 'react';
import API from '../utils/API';
import Register from './Register';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            alert('Login Successful');
        } catch (err) {
            alert('Login Failed');
        }
    };

    return (
        <div className='row mx-0'>
            <div className='col'>
                <div className='row'>
                    <div className='col-6 mx-auto my-5'>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control w-50' />
                            <br/>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control w-50'/>
                            <br/>
                            <button type="submit" className='btn btn-primary'>Login</button>
                            <br/>
                            {/* <p className='my-3'>New user? <a className='ms-2' href={<Register/>}>Register Here</a></p> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
