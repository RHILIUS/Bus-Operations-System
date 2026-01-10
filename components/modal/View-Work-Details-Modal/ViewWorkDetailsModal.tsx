'use client';

import React, { useEffect, useState } from 'react';
import styles from './view-work-modal.module.css';

interface MaintenanceRecord {
  id: string;
  work_no?: string;
  work_title?: string;
  bus_no: string;
  priority?: string;
  start_date?: string;
  due_date?: string;
  status?: string;
  damageReport?: {
    battery: boolean;
    lights: boolean;
    oil: boolean;
    water: boolean;
    brake: boolean;
    air: boolean;
    gas: boolean;
    engine: boolean;
    tireCondition: boolean;
    notes: string;
    checkDate?: string;
    reportedBy: string;
  };
  reportedBy?: string;
  workRemarks?: string;
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  completedDate?: string;
}

interface ViewWorkDetailsModalProps {
  show: boolean;
  onClose: () => void;
  record: MaintenanceRecord;
}

const ViewWorkDetailsModal: React.FC<ViewWorkDetailsModalProps> = ({
  show,
  onClose,
  record,
}) => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  const damageItems = record.damageReport ? [
    { label: 'Battery', value: record.damageReport.battery },
    { label: 'Lights', value: record.damageReport.lights },
    { label: 'Oil', value: record.damageReport.oil },
    { label: 'Water', value: record.damageReport.water },
    { label: 'Brake', value: record.damageReport.brake },
    { label: 'Air', value: record.damageReport.air },
    { label: 'Gas', value: record.damageReport.gas },
    { label: 'Engine', value: record.damageReport.engine },
    { label: 'Tire Condition', value: record.damageReport.tireCondition },
  ] : [];

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="View Work Details Modal">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Work Order Details</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Work Information Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Work Information</h3>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Work No:</span>
                <span className={styles.infoValue}>{record.work_no || 'N/A'}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Work Title:</span>
                <span className={styles.infoValue}>{record.work_title || 'N/A'}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Bus No:</span>
                <span className={styles.infoValue}>{record.bus_no}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Priority:</span>
                {record.priority ? (
                  <span
                    className={
                      record.priority === 'High' || record.priority === 'Critical'
                        ? styles.priorityHigh
                        : record.priority === 'Medium'
                        ? styles.priorityMedium
                        : styles.priorityLow
                    }
                  >
                    {record.priority}
                  </span>
                ) : (
                  <span className={styles.infoValue}>N/A</span>
                )}
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Status:</span>
                <span
                  className={
                    record.status === 'Completed'
                      ? styles.statusCompleted
                      : record.status === 'In Progress'
                      ? styles.statusInProgress
                      : record.status === 'Cancelled'
                      ? styles.statusCancelled
                      : styles.statusPending
                  }
                >
                  {record.status || 'Pending'}
                </span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Start Date:</span>
                <span className={styles.infoValue}>{formatDate(record.start_date)}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Due Date:</span>
                <span className={styles.infoValue}>{formatDate(record.due_date)}</span>
              </div>

              {record.completedDate && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Completed Date:</span>
                  <span className={styles.infoValue}>{formatDate(record.completedDate)}</span>
                </div>
              )}

              {record.assignedTo && (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Assigned To:</span>
                  <span className={styles.infoValue}>{record.assignedTo}</span>
                </div>
              )}

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Reported By:</span>
                <span className={styles.infoValue}>{record.reportedBy || 'N/A'}</span>
              </div>

              {(record.estimatedCost !== undefined || record.actualCost !== undefined) && (
                <>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Estimated Cost:</span>
                    <span className={styles.infoValue}>{formatCurrency(record.estimatedCost)}</span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Actual Cost:</span>
                    <span className={styles.infoValue}>{formatCurrency(record.actualCost)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Work Remarks Section */}
          {record.workRemarks && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Work Remarks</h3>
              <div className={styles.remarksBox}>
                <p className={styles.remarksText}>{record.workRemarks}</p>
              </div>
            </div>
          )}

          {/* Damage Report Section */}
          {record.damageReport && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Damage Report Summary</h3>
              
              {record.damageReport.checkDate && (
                <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
                    <strong>Check Date:</strong> {formatDate(record.damageReport.checkDate)}
                  </p>
                </div>
              )}
              
              <div className={styles.damageGrid}>
                {damageItems.map((item) => (
                  <div key={item.label} className={styles.damageItem}>
                    <span className={styles.damageLabel}>{item.label}:</span>
                    <span className={item.value ? styles.statusOk : styles.statusNotOk}>
                      {item.value ? '✓ OK' : '✗ Not OK'}
                    </span>
                  </div>
                ))}
              </div>

              {record.damageReport.notes && (
                <div className={styles.notesSection}>
                  <p className={styles.notesLabel}><strong>Notes:</strong></p>
                  <p className={styles.notesText}>{record.damageReport.notes}</p>
                </div>
              )}

              {record.damageReport.reportedBy && (
                <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
                    <strong>Damage Reported By:</strong> {record.damageReport.reportedBy}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <small className={styles.currentTime}>{currentTime}</small>
          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewWorkDetailsModal;