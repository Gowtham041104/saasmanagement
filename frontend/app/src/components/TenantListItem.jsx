import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TenantListItem = ({ tenant, onManage, getPlanBadge, onDelete }) => {
  return (
    <tr>
      <td>
        <strong>{tenant.name}</strong>
        
      </td>
      <td><div className="text-muted small">
          {tenant.email || `admin@${tenant.domain}`}
        </div></td>
      <td>{getPlanBadge(tenant.plan)}</td>
      <td>
        {tenant.isActive ? (
          <Badge bg="success">Active</Badge>
        ) : (
          <Badge bg="danger">Inactive</Badge>
        )}
      </td>
      <td>{tenant.subscribedProducts?.length || 0}</td>
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          title="Manage Tenant"
          onClick={() => onManage(tenant)}
        >
          Manage
        </Button>{' '}
        <Link to={`/products?tenantId=${tenant._id}`}>
          <Button variant="outline-success" size="sm" title="View Products">
            Products
          </Button>
        </Link>{' '}
        <Button
          variant="outline-danger"
          size="sm"
          title="Delete Tenant"
          onClick={() =>
            window.confirm('Confirm delete?') && onDelete(tenant._id)
          }
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TenantListItem;
