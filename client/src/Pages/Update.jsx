import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState({
        name: '',
        department: '',
        dob: '',
        age: '',
        gender: '',
        email: '',
        phone_no: '',
        designation: '',
        role:'',
        salary: '',
    });

    useEffect(() => {
        // Fetch the employee data when the component mounts
        fetchEmployee();
    }, []);

    const navi = useNavigate()

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`https://emp-nq0o.onrender.com/employees/${id}`);
            setEmployeeData(response.data[0]);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const handleUpdateSubmit = async () => {
        // Validation logic
        if (
            !employeeData.name ||
            !employeeData.department ||
            !employeeData.dob ||
            !employeeData.age ||
            !employeeData.gender ||
            !employeeData.email ||
            !employeeData.phone_no ||
            !employeeData.designation ||
            !employeeData.salary || !employeeData.role
        ) {
            alert('Incomplete form data. Please fill in all fields.');
            return;
        }

        if (employeeData.age < 18 || employeeData.age > 60) {
            alert('Age should be between 18 and 60.');
            return;
        }

        if (!/^\d{10}$/.test(employeeData.phone_no)) {
            alert('Invalid Phone number. It should be exactly 10 digits.');
            return;
        }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(employeeData.email)) {
            alert('Invalid Email address.');
            return;
        }

        if (!/^\d+$/.test(employeeData.salary) || employeeData.salary <= 0) {
            alert('Invalid Salary. It should be a positive number.');
            return;
        }

        // Make a PUT request to update the employee data
        try {
            console.log("asdfghjk")
            await axios.put(`https://emp-nq0o.onrender.com/employees/${id}`, employeeData);
            // Redirect to the main page after updating
            // You can replace '/main' with the actual path to your main page
            alert("Update successful")
            navi('/');
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });

        // Calculate age based on date of birth
        if (name === 'dob') {
            const age = calculateAge(value);
            setEmployeeData({ ...employeeData, age });
        }
    };

    const handleGenderChange = (e) => {
        setEmployeeData({ ...employeeData, gender: e.target.value });
    };

    const calculateAge = (dob) => {
        const currentDate = new Date();
        const birthDate = new Date(dob);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        return age;
    };

    return (
        <div className="flex-container">
            <div className="update-container">
                <h1>Update Employee</h1>
                <form>
                    <div className="label-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={employeeData.name} onChange={handleInputChange} />
                    </div>

                    <div className="label-group">
                        <label htmlFor="department">Department:</label>
                        <select
                            id="department"
                            name="department"
                            value={employeeData.department}
                            onChange={handleInputChange}
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
        onChange={handleInputChange}
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
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={employeeData.dob}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="label-group">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={employeeData.age}
                            onChange={handleInputChange}
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
                                onChange={handleGenderChange}
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
                                onChange={handleGenderChange}
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
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="label-group">
                        <label htmlFor="phone_no">Phone Number:</label>
                        <input
                            type="number"
                            id="phone_no"
                            name="phone_no"
                            value={employeeData.phone_no}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="label-group">
                        <label htmlFor="role"> Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={employeeData.role}
                            onChange={handleInputChange}
                        >
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
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="button" onClick={handleUpdateSubmit}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;