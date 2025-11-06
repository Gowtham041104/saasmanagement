import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { listTenants, deleteTenant } from '../redux/actions/tenantAction';
import AddTenantModal from '../components/AddTenantModal';
import EditTenantModal from '../components/EditTenantModal';
import ManageFeaturesModal from '../components/ManageFeaturesModal';
import './TenantManager.css';

const TenantManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tenantList = useSelector((state) => state.tenantList);
  const { loading, error, tenants } = tenantList;
  
  const [tenantFeatures, setTenantFeatures] = useState({});

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listTenants());
    }
  }, [dispatch, navigate, userInfo]);

  // Load feature counts for all tenants
  useEffect(() => {
    const loadFeatureCounts = async () => {
      if (!tenants || !userInfo) return;
      
      const counts = {};
      
      for (const tenant of tenants) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          
          const { data } = await axios.get(`/api/products/client/${tenant._id}`, config);
          
          if (data.length > 0 && data[0].features) {
            // Count enabled features
            const enabledCount = Object.values(data[0].features).filter(v => v === true).length;
            counts[tenant._id] = enabledCount;
          } else {
            counts[tenant._id] = 0;
          }
        } catch (error) {
          console.error(`Error loading features for tenant ${tenant._id}:`, error);
          counts[tenant._id] = 0;
        }
      }
      
      setTenantFeatures(counts);
    };
    
    if (tenants && tenants.length > 0) {
      loadFeatureCounts();
    }
  }, [tenants, userInfo]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete tenant "${name}"?`)) {
      await dispatch(deleteTenant(id));
      // Refresh tenant list
      dispatch(listTenants());
    }
  };

  const handleEdit = (tenant) => {
    setSelectedTenant(tenant);
    setShowEditModal(true);
  };

  const handleManageFeatures = (tenant) => {
    setSelectedTenant(tenant);
    setShowFeaturesModal(true);
  };

  const filteredTenants = tenants?.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || client.plan === filterPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getPlanColor = (plan) => {
    const colors = {
      'Free': '#6c757d',
      'Professional': '#007bff',
      'Enterprise': '#6f42c1'
    };
    return colors[plan] || '#6c757d';
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': '#28a745',
      'inactive': '#dc3545',
      'pending': '#ffc107'
    };
    return colors[status] || '#6c757d';
  };

  return (
    <div className="tenant-manager">
      {/* Header */}
      <div className="tm-header">
        <div className="tm-header-left">
          <div className="tm-logo">
            <div className="logo-icon">
              <div className="logo-grid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <h1>SaaS Tenant Manager</h1>
          </div>
        </div>
        <button className="btn-add-tenant" onClick={() => setShowAddModal(true)}>
          <span>+</span> Add New Tenant
        </button>
      </div>

      {/* Search and Filters */}
      <div className="tm-filters">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <select
          className="filter-dropdown"
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
        >
          <option value="all">All Products</option>
          <option value="Free">Free</option>
          <option value="Professional">Professional</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="tm-stats">
        <div className="stat-card stat-blue">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Tenants</div>
            <div className="stat-value">{tenants?.length || 0}</div>
          </div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Tenants</div>
            <div className="stat-value">{tenants?.filter(t => t.status === 'active').length || 0}</div>
          </div>
        </div>

      </div>

      {/* Tenant Cards */}
      {loading ? (
        <div className="tm-loading">Loading tenants...</div>
      ) : error ? (
        <div className="tm-error">{error}</div>
      ) : filteredTenants?.length === 0 ? (
        <div className="tm-empty">
          <p>No tenants found. Start by adding your first tenant!</p>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            Add First Tenant
          </button>
        </div>
      ) : (
        <div className="tm-grid">
          {filteredTenants?.map((tenant) => (
            <div key={tenant._id} className="tenant-card">
              <div className="tenant-card-header">
                <div className="tenant-avatar" style={{ background: getPlanColor(tenant.plan || 'Free') }}>
                  {getInitials(tenant.name)}
                </div>
                <div className="tenant-info">
                  <h3>{tenant.name}</h3>
                  <p className="tenant-domain">{tenant.company || tenant.email}</p>
                </div>
              </div>

              <div className="tenant-card-body">
                <div className="tenant-stats-row">
                  <div className="tenant-stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{tenantFeatures[tenant._id] || 0} Features</span>
                  </div>
                </div>
                <div className="tenant-badges">
                  <span 
                    className="badge badge-status" 
                    style={{ background: getStatusColor(tenant.status) }}
                  >
                    {tenant.status || 'Active'}
                  </span>
                  <span 
                    className="badge badge-plan"
                    style={{ background: getPlanColor(tenant.plan || 'Free') }}
                  >
                    {tenant.plan || 'Free'}
                  </span>
                </div>
              </div>

              <div className="tenant-card-footer">
                <button 
                  className="btn-manage-features"
                  onClick={() => handleManageFeatures(tenant)}
                >
                  Manage Features
                </button>
                <div className="tenant-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => handleEdit(tenant)}
                    title="Edit Tenant"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(tenant._id, tenant.name)}
                    title="Delete Tenant"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AddTenantModal 
        show={showAddModal} 
        handleClose={() => setShowAddModal(false)} 
      />
      
      {selectedTenant && (
        <>
          <EditTenantModal 
            show={showEditModal} 
            handleClose={() => {
              setShowEditModal(false);
              setSelectedTenant(null);
            }}
            tenant={selectedTenant}
          />
          
          <ManageFeaturesModal 
            show={showFeaturesModal} 
            handleClose={() => {
              setShowFeaturesModal(false);
              setSelectedTenant(null);
              // Refresh tenant list to update feature counts
              dispatch(listTenants());
            }}
            tenant={selectedTenant}
          />
        </>
      )}
    </div>
  );
};

export default TenantManager;
