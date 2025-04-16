'use client';

import React, { useEffect, useState } from 'react';
import styles from './bus-route-assignment.module.css';

interface BusRouteAssignment {
  BusRouteAssignmentID: string;
  BusAssignmentID: number;
  RouteID: number;
}

const BusRouteAssignmentPage: React.FC = () => {
  const [assignments, setAssignments] = useState<BusRouteAssignment[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch('/api/bus-route-assignment');
      const data = await response.json();
      console.log('Fetched assignments:', data); // Debugging
      setAssignments(data);
    };

    fetchAssignments();
  }, []);
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
                  <th>Bus Route ID</th>
                  <th>Bus Assignment ID</th>
                  <th>Route ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.BusRouteAssignmentID} className={styles.tableRow}>
                    <td>{assignment.BusRouteAssignmentID}</td>
                    <td>{assignment.BusAssignmentID}</td>
                    <td>{assignment.RouteID}</td>
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