import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import users from "./data";
import "./UsersPage.css";

const RECORDS_PER_PAGE = 5;

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page"), 10);
  const currentPage = Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;
  const totalPages = Math.ceil(users.length / RECORDS_PER_PAGE);

  
  const currentRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
    return users.slice(startIndex, startIndex + RECORDS_PER_PAGE);
  }, [currentPage]);

  const goToPage = (page) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);
    setSearchParams({ page: safePage.toString() });
  };

  const handlePrevious = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="users-page">
      <div className="users-card">
        <header className="users-header">
          <h1>User Directory</h1>
          <p className="subtitle">
            Showing {currentRecords.length} of {users.length} users &middot; Page{" "}
            {currentPage} of {totalPages}
          </p>
        </header>

        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="City">{user.city}</td>
                  <td data-label="Role">
                    <span className="role-badge">{user.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="page-btn"
            onClick={handlePrevious}
            disabled={isFirstPage}
          >
            &larr; Previous
          </button>

          <span className="page-indicator">
            Page <strong>{currentPage}</strong> of {totalPages}
          </span>

          <button
            className="page-btn"
            onClick={handleNext}
            disabled={isLastPage}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}