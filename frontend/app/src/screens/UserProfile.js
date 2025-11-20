import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../redux/actions/userAction';
import './UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    avatar: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setIsEditing(false);
      dispatch(getUserProfile());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow numbers for phone field
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, ''); // Remove all non-digit characters
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      username: user.username || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
    });
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        {!isEditing && (
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            {formData.avatar ? (
              <img src={formData.avatar} alt="User Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {formData.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
              </div>
            )}
          </div>

          {!isEditing ? (
            <div className="profile-info">
              <div className="info-item">
                <label>Username:</label>
                <span>{user.username}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <label>First Name:</label>
                <span>{user.firstName || 'Not set'}</span>
              </div>
              <div className="info-item">
                <label>Last Name:</label>
                <span>{user.lastName || 'Not set'}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{user.phone || 'Not set'}</span>
              </div>
              <div className="info-item">
                <label>Role:</label>
                <span className="role-badge">{user.role}</span>
              </div>
              <div className="info-item">
                <label>Member Since:</label>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="Enter numbers only"
                />
              </div>
              <div className="form-group">
                <label>Avatar URL:</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save">
                  Save Changes
                </button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
