import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./usersSlice";
import "./../styles/UserTable.css";

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector(state => ({
    users: state.users.users,
    status: state.users.status,
  }));
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const totalPages = 10;

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleSort = key => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue =
      sortConfig.key === "name"
        ? `${a.name.first} ${a.name.last}`
        : a.login.username;
    const bValue =
      sortConfig.key === "name"
        ? `${b.name.first} ${b.name.last}`
        : b.login.username;

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="p-4">
      {status === "loading" && (
        <div className="loading-overlay">Loading...</div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="table-header px-6 py-3 text-left text-xs tracking-wider"
              onClick={() => handleSort("name")}
            >
              <button className="cursor-pointer font-medium text-gray-500 uppercase bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                Full Name
              </button>
            </th>
            <th
              className="table-header px-6 py-3 text-left text-xs tracking-wider cursor-pointer table-cell-username"
              onClick={() => handleSort("login.username")}
            >
              <button className="cursor-pointer font-medium text-gray-500 uppercase bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                Username
              </button>
            </th>
            <th className="table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-cell-thumbnail">
              Thumbnail
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map(user => (
            <tr key={user.login.uuid}>
              <td className="table-cell px-6 py-4 whitespace-nowrap text-left">
                {user.name.title} {user.name.first} {user.name.last}
              </td>
              <td className="table-cell px-6 py-4 whitespace-nowrap text-left table-cell-username">
                {user.login.username}
              </td>
              <td className="table-cell px-6 py-4 whitespace-nowrap text-left table-cell-thumbnail">
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-500 text-white transition-transform transform hover:scale-105"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="text-gray-500">
          {page}/{totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-500 text-white transition-transform transform hover:scale-105"
          disabled={page === 10}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
