import React, { useState } from 'react';
import './App.css';
import { Login } from './components/Login/Login.js';
import { Register } from './components/Register/Register';
import { MainPage } from './components/MainPage/MainPage';
import { Route, Routes } from "react-router-dom";

function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  // <div className="app">
  //   {
  //     currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
  //   }
  // </div>
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </div>

  );
}

export default App;
