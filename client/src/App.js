import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main';
import Page from './Pages/Page';
import Update from './Pages/Update';
import Dashboard from './Pages/Dashboard';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/add" element={<Page />} />
                <Route path="/update/:id" element={<Update/>}/>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
