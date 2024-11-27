import React, { useState, useEffect } from 'react';
import API from '../utils/API';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        contact: '',
        profilePicture: '',
    });
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await API.get('/auth/profile');
            setProfile(data);
        } catch (err) {
            alert('Failed to fetch profile');
            console.error(err);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('contact', profile.contact);
        if (newProfilePicture) {
            formData.append('profilePicture', newProfilePicture);
        }

        try {
            await API.put('/auth/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Profile updated successfully');
            fetchProfile();
        } catch (err) {
            alert('Failed to update profile');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await API.put('/auth/change-password', { password });
            alert('Password changed successfully');
        } catch (err) {
            alert('Failed to change password');
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                </label>
                <label>
                    Email:
                    <input type="email" value={profile.email} disabled />
                </label>
                <label>
                    Contact:
                    <input
                        type="text"
                        value={profile.contact}
                        onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
                    />
                </label>
                <label>
                    Profile Picture:
                    <input type="file" onChange={(e) => setNewProfilePicture(e.target.files[0])} />
                </label>
                <button type="submit">Update Profile</button>
            </form>

            <h3>Change Password</h3>
            <form onSubmit={handleChangePassword}>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default Profile;
