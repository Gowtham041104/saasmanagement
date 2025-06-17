import React, { useState } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateTenant } from '../redux/actions/tenantAction';
import TenantListItem from './TenantListItem';
import ManageTenantModal from './ManageTenantModal';

const TenantList = ({ tenants }) => {
  const dispatch = useDispatch();
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleManageTenant = (tenant) => {
    setSelectedTenant(tenant);
    setShowManageModal(true);
  };

  const handleUpdateTenant = (tenantId, updatedData) => {
    dispatch(updateTenant(tenantId, updatedData));
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'enterprise':
        return <Badge bg="primary">Enterprise</Badge>;
      case 'professional':
        return <Badge bg="success">Professional</Badge>;
      default:
        return <Badge bg="warning" text="dark">Free</Badge>;
    }
  };

  return (
    <div className="tenant-list mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Domain</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants?.map(tenant => (
            <TenantListItem 
              key={tenant._id}
              tenant={tenant}
              onManage={handleManageTenant}
              getPlanBadge={getPlanBadge}
              onDelete={() => {}}
            />
          ))}
        </tbody>
      </Table>

      <ManageTenantModal
        tenant={selectedTenant}
        show={showManageModal}
        onClose={() => setShowManageModal(false)}
        onUpdate={handleUpdateTenant} // ✅ This fixes the error
      />
    </div>
  );
};

export default TenantList;
