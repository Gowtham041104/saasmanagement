import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardStats = ({ tenants }) => {
  const activeTenants = tenants?.filter(tenant => tenant.status === 'active').length || 0;
  const totalProducts = tenants?.reduce((sum, tenant) => sum + (tenant.products?.length || 0), 0) || 0;
  const avgProducts = tenants?.length ? (totalProducts / tenants.length).toFixed(1) : 0;

  return (
    <div className="dashboard-stats mb-4">
      <div className="row">
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Tenants</Card.Title>
              <Card.Text className="display-6">{tenants?.length || 0}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Active Tenants</Card.Title>
              <Card.Text className="display-6">{activeTenants}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Avg Products/Tenant</Card.Title>
              <Card.Text className="display-6">{avgProducts}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Features</Card.Title>
              <Card.Text className="display-6">18</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;