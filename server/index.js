const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'bt8hfgmb30zpgbcq6trt-mysql.services.clever-cloud.com',
    user: 'ufmoac8vus3hasmm',
    password: 'PZIJIqMnYN2pImNaVAF2',
    database: 'bt8hfgmb30zpgbcq6trt'
});

/*
// Create employee table if not exists
db.query(`
    CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employeeId VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(10) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        salary INT NOT NULL,
        age INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_no VARCHAR(15) NOT NULL
    )
`, (err) => {
    if (err) throw err;
    console.log('Employees table created or already exists');
});
*/

// Get all employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// Add a new employee
app.post('/employees/add', (req, res) => {
    console.log(req.body)
    const sql = 'INSERT INTO employees (id, name, department, dob, gender, designation, salary, age, email, phone_no, role) VALUES (?)';
    const values=[req.body.employeeId, req.body.employeeName, req.body.department, req.body.dob, req.body.gender, req.body.designation, req.body.salary, req.body.age, req.body.email, req.body.phone_no, req.body.role]   
    db.query(sql,[values], (err, result) => {
        if (err) {
            // console.log(err)
            return res.json(err);
        }
        return res.json({ success: true, message: 'Employee added successfully' });
    });
});

// Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;

    const sql = 'DELETE FROM employees WHERE id = ?';

    db.query(sql, [employeeId], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        return res.json({ success: true, message: 'Employee deleted successfully' });
    });
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const { name, department, dob, age, gender, designation, salary, email, phone_no } = req.body;

    const sql = 'UPDATE employees SET name=?, department=?, dob=?, age=?, gender=?, designation=?, salary=?, email=?, phone_no=?, role=? WHERE id=?';

    db.query(sql, [name, department, dob, age, gender, designation, salary, email, phone_no, employeeId, role], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        return res.json({ success: true, message: 'Employee updated successfully' });
    });
});

app.get("/employees/:id",(req,res)=>{
    // console.log(params.id)
    const q="select * from employees where id= ?"
    const id=[req.params.id]    
    db.query(q,id,(err,data)=>{
        if(err) return res.json(err)
        // console.log(data)
        return  res.json(data)
    })
})
// ...

app.listen(7000, () => {
    console.log("Listening on port 7000...");
});