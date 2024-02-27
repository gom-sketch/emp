// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    // Fetch employee data when the component mounts
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/employees');
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const EmployeeCountByDepartmentChart = ({ data }) => {
    const departmentCounts = {};
    data.forEach((employee) => {
      departmentCounts[employee.department] = (departmentCounts[employee.department] || 0) + 1;
    });

    const chartData = Object.keys(departmentCounts).map((department) => ({
      department,
      count: departmentCounts[department],
    }));

    const colors = ['#82ca9d', '#ffc658', '#8884d8', '#ff7f50', '#8a2be2']; // Add more colors as needed

    return (
      <div style={{ backgroundColor: 'beige', padding: '20px', borderRadius: '10px', width: '40%', marginBottom: '20px', marginLeft:'80px'  }}>
        <h2>Employee Count by Department</h2>
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  };

  const AverageSalaryByDepartmentChart = ({ data }) => {
    const departmentSalaries = {};
    const departmentCounts = {};

    data.forEach((employee) => {
      const department = employee.department;
      departmentSalaries[department] = (departmentSalaries[department] || 0) + employee.salary;
      departmentCounts[department] = (departmentCounts[department] || 0) + 1;
    });

    const chartData = Object.keys(departmentSalaries).map((department) => ({
      department,
      averageSalary: departmentSalaries[department] / departmentCounts[department],
    }));

    const colors = ['#8884d8', '#ff7f50', '#ffc658', '#82ca9d', '#8a2be2']; // Add more colors as needed

    return (
      <div style={{ backgroundColor: 'beige', padding: '20px', borderRadius: '10px', width: '30%', marginBottom: '20px', marginRight:'200px' }}>
        <h2>Average Salary by Department</h2>
        <PieChart width={500} height={300}>
          <Pie
            dataKey="averageSalary"
            data={chartData}
            cx={150}
            cy={100}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  };

  const RoleWiseSalaryComparisonChart = ({ data }) => {
    const roleSalaries = {};
  
    data.forEach((employee) => {
      const role = employee.role;
      const salary = employee.salary;
  
      if (!roleSalaries[role]) {
        roleSalaries[role] = [];
      }
  
      roleSalaries[role].push(salary);
    });
  
    const chartData = Object.keys(roleSalaries).map((role) => ({
      role,
      salary: roleSalaries[role],
    }));
  
    return (
        <div style={{ backgroundColor: 'beige', padding: '20px', borderRadius: '10px', width: '45%', marginBottom: '20px', marginLeft:'380px' }}>
        <h2>Role-wise Salary Comparison</h2>
        <BarChart width={600} height={400} data={chartData}>
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartData[0]?.salary.map((_, index) => (
            <Bar key={index} dataKey={`salary[${index}]`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
          ))}
        </BarChart>
      </div>
    );
  };  

  const AgeDistributionByDepartmentChart = ({ data }) => {
    const departmentAgeDistribution = {};

    data.forEach((employee) => {
      const department = employee.department;
      const age = employee.age;

      if (!departmentAgeDistribution[department]) {
        departmentAgeDistribution[department] = [];
      }

      departmentAgeDistribution[department].push(age);
    });

    const chartData = Object.keys(departmentAgeDistribution).map((department) => {
      const ages = departmentAgeDistribution[department];

      return {
        department,
        avgAge: ages.reduce((sum, age) => sum + age, 0) / ages.length,
      };
    });

    const colors = ['#82ca9d', '#ffc658', '#8884d8', '#ff7f50', '#8a2be2']; // Add more colors as needed

    return (
      <div style={{ backgroundColor: 'beige', padding: '20px', borderRadius: '10px', width: '45%', marginBottom: '20px',marginLeft:'35px' }}>
        <h2>Age Distribution by Department</h2>
        <BarChart width={400} height={300} data={chartData}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgAge">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  };

  const SalaryDistributionByRoleChart = ({ data }) => {
    const roleSalaryDistribution = {};

    data.forEach((employee) => {
      const role = employee.role;
      const salary = employee.salary;

      if (!roleSalaryDistribution[role]) {
        roleSalaryDistribution[role] = [];
      }

      roleSalaryDistribution[role].push(salary);
    });

    const chartData = Object.keys(roleSalaryDistribution).map((role) => {
      const salaries = roleSalaryDistribution[role];

      return {
        role,
        avgSalary: salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length,
      };
    });

    const colors = ['#82ca9d', '#ffc658', '#8884d8', '#ff7f50', '#8a2be2']; // Add more colors as needed

    return (
      <div style={{ backgroundColor: 'beige', padding: '20px', borderRadius: '10px', width: '45%', marginBottom: '20px', marginRight:'20px' }}>
        <h2>Salary Distribution by Role</h2>
        <BarChart width={400} height={300} data={chartData}>
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgSalary">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  };

  return (
    // <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
    <div>
      <h1 className='dash-head'>Admin Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px' }}>
        <EmployeeCountByDepartmentChart data={employeeData} />
        <AverageSalaryByDepartmentChart data={employeeData} />
        <AgeDistributionByDepartmentChart data={employeeData} />
        <SalaryDistributionByRoleChart data={employeeData} />
        <RoleWiseSalaryComparisonChart data={employeeData} />
      </div>
    </div>
  );
};

export default Dashboard;
