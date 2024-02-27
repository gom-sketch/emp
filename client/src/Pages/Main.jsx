// Main.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Main = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:7000/employees');
      // console.log(response.data)
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    window.location.replace(`/update/${employee.id}`);
  };
  console.log(employees)
  return (
    <div className='block'>
      <h1>WorkSync Elite</h1>
      <div className="button-container">
        <Link to="/add">
          <button className="add-button">Add New Employee</button>
        </Link>
        <Link to ='/dashboard'>
        <button className='dash'>Dashboard</button>
        </Link>
      </div>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.dob}</td>
                <td>{employee.age}</td>
                <td>{employee.gender}</td>
                <td>{employee.email}</td>
                <td>{employee.phone_no}</td>
                <td>{employee.role}</td>
                <td>{employee.salary}</td>
                <td className="employee-actions">
                  <button className="update" onClick={() => handleUpdateClick(employee)}>
                    Update
                  </button>
                  <button className="delete" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;