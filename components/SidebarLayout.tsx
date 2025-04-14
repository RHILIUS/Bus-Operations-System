'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const underlineRef = useRef<HTMLDivElement>(null);

  const toggleSubMenu = (id: string) => {
    const submenu = document.getElementById(id);
    if (submenu) {
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }

    document.querySelectorAll('.nav-item.module').forEach((el) => {
      const next = el.nextElementSibling as HTMLElement | null;
      if (next && next.id !== id) {
        el.classList.remove('active');
        next.style.display = 'none';
      }
    });

    const parent = document.querySelector(`[data-toggle-id="${id}"]`);
    parent?.classList.toggle('active');
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main-content');
    const arrow = document.getElementById('arrow');

    sidebar?.classList.toggle('collapsed');
    main?.classList.toggle('expanded');
    if (arrow && sidebar) {
      arrow.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    }
  };

  const updateUnderline = (el: HTMLElement) => {
    if (underlineRef.current) {
      underlineRef.current.style.left = `${el.offsetLeft}px`;
      underlineRef.current.style.width = `${el.offsetWidth}px`;
    }
  };

  useEffect(() => {
    const subItems = document.querySelectorAll('.sub-item');
    subItems.forEach((item) =>
      item.addEventListener('click', () => {
        subItems.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
      })
    );

    const navItems = document.querySelectorAll('.nav-links > a.nav-item');
    navItems.forEach((item) =>
      item.addEventListener('click', () => {
        navItems.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
      })
    );

    const topLinks = document.querySelectorAll('.top-link');
    topLinks.forEach((link) =>
      link.addEventListener('click', (e) => {
        e.preventDefault();
        topLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
        updateUnderline(link as HTMLElement);
      })
    );

    const handleResize = () => {
      const activeLink = document.querySelector('.top-link.active') as HTMLElement;
      if (activeLink) updateUnderline(activeLink);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="sidebar" id="sidebar">
        <div>
          <div className="logo">
            <img src="/assets/images/agilalogo.png" alt="Agila Logo" />
          </div>

          <div className="nav-links">
            <div
              className="nav-item module"
              data-toggle-id="assignment-submenu"
              onClick={() => toggleSubMenu('assignment-submenu')}
            >
              <img src="/assets/images/assignmentbus.png" alt="Assignment" className="nav-icon" />
              <span className="nav-text">Assignment</span>
            </div>
            <div id="assignment-submenu" className="sub-menu">
              <Link href="/bus-assignment" className="sub-item">Bus Driver/Conductor Assignment</Link>
              <Link href="/bus-route-assignment" className="sub-item">Bus Route Assignment</Link>
              <Link href="/qouta-assignment" className="sub-item">Quota Assignment</Link>
            </div>

            <Link href="/route-management" className="nav-item">
              <img src="/assets/images/routemanagement.png" alt="Route Management" className="nav-icon" />
              <span className="nav-text">Route Management</span>
            </Link>

            <Link href="/gps" className="nav-item">
              <img src="/assets/images/GPS.png" alt="GPS" className="nav-icon" />
              <span className="nav-text">GPS</span>
            </Link>

            <Link href="/bus-operation" className="nav-item">
              <img src="/assets/images/busoperation.png" alt="Bus Operation" className="nav-icon" />
              <span className="nav-text">Bus Operation</span>
            </Link>

            <Link href="/bus-rental" className="nav-item">
              <img src="/assets/images/busrental.png" alt="Bus Rental" className="nav-icon" />
              <span className="nav-text">Bus Rental</span>
            </Link>

            <Link href="/performance-report" className="nav-item">
              <img src="/assets/images/performancereport.png" alt="Performance Report" className="nav-icon" />
              <span className="nav-text">Performance Report</span>
            </Link>
          </div>
        </div>

        <div className="logout">
          <a href="#">
            <img src="/assets/images/logout.png" alt="Logout" className="nav-icon" />
            <span className="nav-text">Logout</span>
          </a>
        </div>

        <div className="toggle-btn" onClick={toggleSidebar}>
          <span id="arrow">◀</span>
        </div>
      </div>

      <div className="main-content" id="main-content">
        <div className="top-bar">
          <div className="top-links">
            <a href="#" className="top-link active">Accounting</a>
            <a href="#" className="top-link">Human Resource</a>
            <a href="#" className="top-link">Inventory</a>
            <a href="#" className="top-link">Operational</a>
            <div className="link-underline" ref={underlineRef}></div>
          </div>
        </div>
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
