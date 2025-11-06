import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTenant, listTenants } from '../redux/actions/tenantAction';
import './TenantModal.css';

const AddTenantModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.tenantCreate || {});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'Free',
    status: 'active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Wait for tenant creation
      await dispatch(createTenant(formData));
      
      // Wait a moment for the backend to process
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Refresh tenant list
      await dispatch(listTenants());
      
      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        plan: 'Free',
        status: 'active'
      });
      
      handleClose();
    } catch (error) {
      console.error('Error creating tenant:', error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Tenant</h2>
          <button className="modal-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="alert-error">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Tenant Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Acme Corporation"
                  required
                />
              </div>

              <div className="form-group">
                <label>Admin Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@acme.example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Subscription Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                >
                  <option value="Free">Free</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Tenant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTenantModal;
