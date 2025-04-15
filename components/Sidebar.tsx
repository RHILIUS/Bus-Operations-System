'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <button className={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '➡' : '⬅'}
      </button>

      {!collapsed && (
        <div className={styles.navLinks}>
          <div className={styles.navItem}>
            <img src="/assets/images/assignmentbus.png" alt="Assignment" className={styles.navIcon} />
            <span className={styles.navText}>Assignment</span>
            <div className={styles.subMenu}>
              <Link href="/bus-assignment" className={styles.subItem}>Bus Driver/Conductor Assignment</Link>
              <Link href="/bus-route-assignment" className={styles.subItem}>Bus Route Assignment</Link>
              <Link href="/qouta-assignment" className={styles.subItem}>Quota Assignment</Link>
            </div>
          </div>

          <Link href="/route-management" className={styles.navItem}>
            <img src="/assets/images/routemanagement.png" alt="Route Management" className={styles.navIcon} />
            <span className={styles.navText}>Route Management</span>
          </Link>

          <Link href="/gps" className={styles.navItem}>
            <img src="/assets/images/GPS.png" alt="GPS" className={styles.navIcon} />
            <span className={styles.navText}>GPS</span>
          </Link>

          <Link href="/bus-operation" className={styles.navItem}>
            <img src="/assets/images/busoperation.png" alt="Bus Operations" className={styles.navIcon} />
            <span className={styles.navText}>Bus Operations</span>
          </Link>

          <Link href="/bus-rental" className={styles.navItem}>
            <img src="/assets/images/busrental.png" alt="Bus Rental" className={styles.navIcon} />
            <span className={styles.navText}>Bus Rental</span>
          </Link>

          <Link href="/performance-report" className={styles.navItem}>
            <img src="/assets/images/performancereport.png" alt="Performance Report" className={styles.navIcon} />
            <span className={styles.navText}>Performance Report</span>
          </Link>
        </div>
      )}
    </div>
  );
}