import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listTenants } from '../redux/actions/tenantAction';
import DashboardStats from '../components/DashboardStats';
import TenantList from '../components/TenantList';
import AddTenantModal from '../components/AddTenantModal';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Corrected selector to match `store.js`
  const { tenants = [], loading, error } = useSelector((state) => state.tenantList);

  useEffect(() => {
    dispatch(listTenants());
  }, [dispatch]);

  return (
    <div className="dashboard container mt-4">
      <h1 className="mb-4">SaaS Tenant Manager</h1>

      <DashboardStats tenants={tenants} />

      <button 
        className="btn btn-primary mb-3"
        onClick={() => setShowAddModal(true)}
      >
        Add New Tenant
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <TenantList tenants={tenants} />
      )}
<AddTenantModal 
  show={showAddModal}
  handleClose={() => setShowAddModal(false)}
/>
    </div>
  );
};

export default DashboardScreen;
