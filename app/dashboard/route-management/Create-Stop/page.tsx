'use client';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';

interface Stop {
  name: string;
  longitude: string;
  latitude: string;
}

const mockStops: Stop[] = Array.from({ length: 150 }, (_, i) => ({
  name: `Stop ${i + 1}`,
  longitude: (120 + Math.random()).toFixed(6),
  latitude: (14 + Math.random()).toFixed(6),
}));

const ITEMS_PER_PAGE = 10;

const RouteManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockStops.length / ITEMS_PER_PAGE);

  const currentStops = mockStops.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          
          {/* Create Stop Section */}
          <h2 className={styles.stopTitle}>CREATE STOP</h2>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Stop Name" />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Longitude" />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Latitude" />
            </div>
          </div>

          {/* Stops Table Section */}
          <h2 className="card-title mb-3">Stops</h2>
          <div className="row g-2 align-items-center mb-3">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Search..." />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>Select item</option>
              </select>
            </div>
            <div className="col-md-5 text-end">
              <button className="btn btn-primary me-2">
                <img src="/assets/images/eraser-line.png" alt="Clear" className="icon-small" />
                Clear
              </button>
              <button className="btn btn-success me-2">
                <img src="/assets/images/add-line.png" alt="Add" className="icon-small" />
                Add
              </button>
              <button className="btn btn-danger me-2">
                <img src="/assets/images/export.png" alt="Export" className="icon-small" />
                Export CSV
              </button>
              <button className="btn btn-danger text-white">
                <img src="/assets/images/import.png" alt="Import" className="icon-small" />
                Import CSV
              </button>
            </div>
          </div>

          <table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th>Stop Name</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStops.map((stop, index) => (
                <tr key={index}>
                  <td>{stop.name}</td>
                  <td>{stop.longitude}</td>
                  <td>{stop.latitude}</td>
                  <td className="text-center">
                    <div className="d-inline-flex align-items-center gap-1">
                      <button className="btn btn-sm btn-primary p-1">
                        <img
                          src="/assets/images/edit-white.png"
                          alt="Edit"
                          width={25}
                          height={25}
                        />
                      </button>
                      <button className="btn btn-sm btn-danger p-1">
                        <img
                          src="/assets/images/delete-white.png"
                          alt="Delete"
                          width={25}
                          height={25}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }).map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RouteManagementPage;
