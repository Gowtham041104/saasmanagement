import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { listTenants } from "../redux/actions/tenantAction";
import "./ManageFeaturesModal.css";

const ManageFeaturesModal = ({ show, handleClose, tenant }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Available features
  const availableFeatures = [
    {
      id: "crm",
      name: "CRM",
      description: "Customer Relationship Management",
      category: "Sales",
    },
    {
      id: "deal-pipeline",
      name: "Deal Pipeline",
      description: "Track and manage sales opportunities",
      category: "Sales",
    },
    {
      id: "task-management",
      name: "Task Management",
      description: "Create and assign tasks to team members",
      category: "Productivity",
    },
    {
      id: "email-integration",
      name: "Email Integration",
      description: "Send and track emails within the CRM",
      category: "Communication",
    },
    {
      id: "advanced-reporting",
      name: "Advanced Reporting",
      description: "Generate detailed sales and activity reports",
      category: "Analytics",
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Business Intelligence and Reporting",
      category: "Analytics",
    },
    {
      id: "custom-dashboards",
      name: "Custom Dashboards",
      description: "Create personalized analytics dashboards",
      category: "Analytics",
    },
    {
      id: "scheduled-reports",
      name: "Scheduled Reports",
      description: "Set up automated report delivery",
      category: "Analytics",
    },
    {
      id: "data-export",
      name: "Data Export",
      description: "Export data in various formats",
      category: "Analytics",
    },
    {
      id: "api-access",
      name: "API Access",
      description: "Access analytics data via API",
      category: "Analytics",
    },
    {
      id: "predictive-analytics",
      name: "Predictive Analytics",
      description: "AI-powered business predictions",
      category: "Analytics",
    },
    {
      id: "marketing",
      name: "Marketing",
      description: "Marketing Automation and Campaigns",
      category: "Marketing",
    },
    {
      id: "support",
      name: "Support",
      description: "Customer Support and Ticketing",
      category: "Support",
    },
  ];

  const [enabledFeatures, setEnabledFeatures] = useState({});

  // Load features for this tenant
  useEffect(() => {
    const loadFeatures = async () => {
      if (!tenant || !userInfo) return;

      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `/api/products/client/${tenant._id}`,
          config
        );

        // Initialize enabled features
        const enabled = {};
        availableFeatures.forEach((feature) => {
          enabled[feature.id] = false;
        });

        // Mark features as enabled if they exist
        if (data.length > 0 && data[0].features) {
          Object.entries(data[0].features).forEach(([key, value]) => {
            if (value === true) {
              enabled[key] = true;
            }
          });
        }

        setEnabledFeatures(enabled);
      } catch (error) {
        console.error("Error loading features:", error);
      } finally {
        setLoading(false);
      }
    };

    if (show && tenant) {
      loadFeatures();
    }
  }, [show, tenant, userInfo, availableFeatures]);

  const toggleFeature = (featureId) => {
    setEnabledFeatures((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }));
  };

  const handleSave = async () => {
    if (!tenant || !userInfo) return;

    setSaving(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Save features
      await axios.post(
        "/api/products",
        {
          features: enabledFeatures,
          clientId: tenant._id,
        },
        config
      );

      // Refresh tenant list
      dispatch(listTenants());

      alert("Features updated successfully!");
      handleClose();
    } catch (error) {
      console.error("Error saving features:", error);
      alert(
        "Failed to save features: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  // Group features by category
  const groupedFeatures = availableFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-container features-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Manage Features</h2>
          <button className="modal-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="tenant-info-banner">
            <div className="tenant-avatar-small">
              {tenant?.name?.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3>{tenant?.name}</h3>
              <p>{tenant?.company || tenant?.email}</p>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <p>Loading features...</p>
            </div>
          ) : (
            <div className="features-list">
              {Object.entries(groupedFeatures).map(([category, features]) => (
                <div key={category} className="feature-category">
                  <h4 className="category-title">{category}</h4>
                  {features.map((feature) => (
                    <div key={feature.id} className="feature-item">
                      <div className="feature-info">
                        <div className="feature-name">{feature.name}</div>
                        <div className="feature-description">
                          {feature.description}
                        </div>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={enabledFeatures[feature.id] || false}
                          onChange={() => toggleFeature(feature.id)}
                          disabled={saving}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-cancel"
            onClick={handleClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-save"
            onClick={handleSave}
            disabled={saving || loading}
          >
            {saving ? "Saving..." : "Save Features"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageFeaturesModal;
