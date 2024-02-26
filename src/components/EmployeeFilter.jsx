import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeFilter = (data) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    id: '',
    name: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    axios.get('https://dummy.restapiexample.com/api/v1/employees')
      .then(response => {
        setEmployees(response.data.data);
        setFilteredEmployees(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching employees: ', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  useEffect(() => {
    const filteredData = employees.filter(employee => {
      return (
        employee.id.includes(filterCriteria.id) &&
        employee.employee_name.toLowerCase().includes(filterCriteria.name.toLowerCase()) &&
        employee.employee_username.toLowerCase().includes(filterCriteria.username.toLowerCase()) &&
        employee.employee_email.toLowerCase().includes(filterCriteria.email.toLowerCase())
      );
    });
    setFilteredEmployees(filteredData);
  }, [filterCriteria, employees]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="id"
          placeholder="Filter by ID"
          value={filterCriteria.id}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filterCriteria.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Filter by Username"
          value={filterCriteria.username}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filterCriteria.email}
          onChange={handleFilterChange}
        />
      </form>
      <ul>
        {filteredEmployees.map(employee => (
          <li key={employee.id}>
            <div>ID: {employee.id}</div>
            <div>Name: {employee.employee_name}</div>
            <div>Username: {employee.employee_username}</div>
            <div>Email: {employee.employee_email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeFilter;
