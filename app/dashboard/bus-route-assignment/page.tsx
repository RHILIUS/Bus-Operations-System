'use client';

import React from 'react';
import styles from './bus-route-assignment.module.css';

const BusRouteAssignmentPage: React.FC = () => {
  return (
    <div className="dashboard-content">
      <div className="center-box">
        <div className={styles.container}>
          {/* Tabs + Quota */}
          <div className={styles.tabRow}>
            <div className={styles.tabs}>
              <button className={styles.tab}>
                <img src="/assets/images/assignedbus.png" alt="Bus Icon" className={styles.tabIcon} />
                Assign Bus Driver/Conductor
              </button>
              <button className={`${styles.tab} ${styles.tabActive}`}>
                <img src="/assets/images/assignedroute.png" alt="Route Icon" className={styles.tabIcon} />
                Assign Bus to Route
              </button>
            </div>
            <button className={styles.tab}>
              <img src="/assets/images/philippine-peso.png" alt="Peso Icon" className={styles.tabIcon} />
              Quota Count
            </button>
          </div>

          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterRow}>
              <label className={styles.filterLabel}>Filter</label>
              <select className={styles.select}>
                <option>Route</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                className={styles.input}
              />
            </div>

            {/* Form section */}
            <div className={styles.formSection}>
              <div className={styles.formGroup}>
                <img src="/assets/images/assignedbus.png" alt="Bus Icon" className={styles.icon} />
                <select className={styles.selectBlack}>
                  <option>-- Select Bus --</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <img src="/assets/images/assignedroute.png" alt="Route Icon" className={styles.icon} />
                <select className={styles.selectBlack}>
                  <option>-- Select Route --</option>
                </select>
              </div>
            </div>

            {/* Action buttons */}
            <div className={styles.actionButtons}>
              <button className={styles.clearButton}>CLEAR</button>
              <button className={styles.saveButton}>SAVE</button>
            </div>
          </div>

          {/* Table */}
          <div className={styles.dataTable}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th>Bus Number</th>
                  <th>Route</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className={styles.tableRow}>
                    <td>PQA-1004</td>
                    <td>1</td>
                    <td>PITX</td>
                    <td>SAN JOSE</td>
                    <td className={styles.actions}>
                      <button className={styles.editBtn}>
                        <img src="/assets/images/edit.png" alt="Edit" />
                      </button>
                      <button className={styles.deleteBtn}>
                        <img src="/assets/images/delete.png" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusRouteAssignmentPage;