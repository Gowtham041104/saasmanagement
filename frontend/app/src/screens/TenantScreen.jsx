import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTenants } from '../redux/actions/tenantAction';
import { Container, Button } from 'react-bootstrap';
import TenantList from '../components/TenantList';
import AddTenantModal from '../components/AddTenantModal';

const TenantScreen = () => {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = React.useState(false);

  useEffect(() => {
    dispatch(listTenants());
  }, [dispatch]);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tenants</h1>
        <Button onClick={() => setShowAddModal(true)}>Add Tenant</Button>
      </div>
      
      <TenantList />
      <AddTenantModal 
        show={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </Container>
  );
};

export default TenantScreen;