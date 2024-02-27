import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Page = () => {
    const [employeeData, setEmployeeData] = useState({
        employeeId: '',
        employeeName: '',
        dob: '',
        age: '',
        gender: '',
        email: '',
        phone_no: '',
        department: '',
        designation: '',
        role:'',
        salary: '',
    });

    const navi=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'employeeId' && parseInt(value) < 1) {
            alert('Employee ID cannot be negative or 0.');
            return;
        }


        if (name === 'salary') {
            const parsedSalary = parseInt(value);
            // Check if salary is negative or exceeds 8 digits
            if (parsedSalary < 0 || value.length > 8) {
                alert('Salary should be a non-negative value with at most 8 digits.');
                return;
            }
        }

    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));

        // Check if the field is 'dob'
        if (name === 'dob') {
            // Add logic to calculate age here based on the entered 'dob'
            const age = calculateAge(value); // Replace 'calculateAge' with your actual function
    
            // Display alert if age is less than 19
            if (age < 19) {
              alert('Age should be 18 or above.');
              return;
            }
            
    
            // Update the state with 'dob' and 'age'
            setEmployeeData({ ...employeeData, dob: value, age });
        } else {
            // For other fields, update as usual
            setEmployeeData({ ...employeeData, [name]: value });
        }
    };
    
    const calculateAge = (dob) => {
        // Add logic to calculate age based on 'dob'
        // Example logic (replace it with your actual logic):
        const currentDate = new Date();
        const birthDate = new Date(dob);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
    
        return age;
    };
    
    
    const handleSubmit = async () => {
        // Validate form data (you can add more validations here)
        if (!employeeData.employeeId || !employeeData.employeeName || !employeeData.dob || !employeeData.age || !employeeData.gender ||
            !employeeData.email || !employeeData.phone_no || !employeeData.department || !employeeData.designation || !employeeData.salary || !employeeData.role) {
            alert('Incomplete form data. Please fill in all fields.');
            return;
        }
    
        // Check if the age is strictly less than 19
        if (employeeData.age < 19 ) {
            alert('Employee is underage. Please check the date of birth.');
            return;
        }
        
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(employeeData.email)) {
          alert('Invalid Email address.');
          return;
      }
      if(employeeData.age>55){
        alert("Age limit exceeded");
        return;
      }
        // Check if the ID already exists
        const idExists = employeeData[employeeData.employeeId];
        if (idExists) {
          alert('Employee ID already exists. Please recheck or contact the admin.');
          return;
        }

        if (employeeData.phone_no < 1000000000 || employeeData.phone_no>9999999999) {
          alert('Invalid Phonenumber');
          return;
      }
        

        // Make a POST request to the server
        try {
            const response = await axios.post('https://emp-nq0o.onrender.com/employees/add', employeeData);
            if(response.data.code==="ER_DUP_ENTRY") alert("Duplicate ID is not allowed")
            // console.log(response)
          else{
            alert('Employee added');
            navi('/');
          }
        } catch (err) {
            console.log(err);
        }
    };
    
       
    
    return (
        <div className="flex-container">
          <div className="page-container">
            <h1>Employee Management Form</h1>
            <div className="form">
            <form>
              <div className="label-group">
                <label htmlFor="employeeId">Employee ID:</label>
                <input
                  type="number"
                  id="employeeId"
                  name="employeeId"
                  value={employeeData.employeeId}
                  onChange={handleChange}
                />
              </div>
      
              <div className="label-group">
                <label htmlFor="employeeName">Employee Name:</label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={employeeData.employeeName}
                  onChange={handleChange}
                />
              </div>
      
              <div className="label-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={employeeData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
      
              <div className="label-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={employeeData.age}
                  onChange={handleChange}
                  readOnly
                />
              </div>
      
              <div className="label-group">
                <label>Gender:</label>
                <div className="radio-group">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={employeeData.gender === 'Male'}
                    onChange={handleChange}
                  />
                  <label className="radio-label" htmlFor="male">
                    Male
                  </label>
      
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={employeeData.gender === 'Female'}
                    onChange={handleChange}
                  />
                  <label className="radio-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
      
              <div className="label-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleChange}
                />
              </div>
      
              <div className="label-group">
                <label htmlFor="phone_no">Phone Number:</label>
                <input
                  type="number"
                  id="phone_no"
                  name="phone_no"
                  value={employeeData.phone_no}
                  onChange={handleChange}
                />
              </div>
      
              <div className="label-group">
                <label htmlFor="department">Department:</label>
                <select
                  id="department"
                  name="department"
                  value={employeeData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="HR">Human Resources</option>
                  <option value="IT">Information Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div className="label-group">
    <label htmlFor="designation">Designation:</label>
    <select
        id="designation"
        name="designation"
        value={employeeData.designation}
        onChange={handleChange}
    >
        <option value="">Select Designation</option>
        {employeeData.department === 'HR' && (
            <>
                <option value="Recruitment">Recruitment</option>
                <option value="Employee Relations">Employee Relations</option>
                <option value="Training and Development">Training and Development</option>
            </>
        )}
        {employeeData.department === 'IT' && (
            <>
                <option value="Software Development">Software Development</option>
                <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
                <option value="IT Support">IT Support</option>
                <option value="Database Administration">Database Administration</option>
            </>
        )}
        {employeeData.department === 'Finance' && (
            <>
                <option value="Accounting">Accounting</option>
                <option value="Audit">Audit</option>
                <option value="Treasury">Treasury</option>
            </>
        )}
        {employeeData.department === 'Marketing' && (
            <>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Content Marketing">Content Marketing</option>
                <option value="Product Marketing">Product Marketing</option>
                <option value="Market Research">Market Research</option>
            </>
        )}
        {employeeData.department === 'Sales' && (
            <>
                <option value="Inside Sales">Inside Sales</option>
                <option value="Field Sales">Field Sales</option>
                <option value="Account Management">Account Management</option>
                <option value="Sales Operations">Sales Operations</option>
            </>
        )}
    </select>
</div>

      
              <div className="label-group">
                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  name="role"
                  value={employeeData.role}
                  onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="Intern">Intern</option>
                  <option value="Trainee">Trainee</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Manager">Manager</option>
                  <option value="Senior Manager">Senior Manager</option>

                </select>
              </div>
      
              <div className="label-group">
                <label htmlFor="salary">Salary:</label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={employeeData.salary}
                  onChange={handleChange}
                />
              </div>
      
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
            </div>
          </div>
        </div>
      );
      
};

export default Page;