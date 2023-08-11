import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPass] = useState('');
    const [password1, setPass1] = useState('');
    const navigate = useNavigate();

    const api = "https://localhost:7223/api"
    const handleSubmit = (e) => {
        e.preventDefault();
        const registerData = {
            name,
            password,
        };

        if(password === password1){
            const response = fetch(`${api}/Authorize/SignUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            })
            .then(response => response.json())
            .then(responseData => {
                let status = responseData.status;
                let message = responseData.message;
                if(status === 'Ok'){
                    navigate('/');
                }else if(status = 'Error'){
                    alert("Такий користувач вже існує");
                }
            })
            .catch(error => {
                console.error('Помилка:', error);
            });
        }
        else{
            alert("Паролі не співпадають");
        }
        
    }

    return (
        <div className="reg-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className='label' htmlFor="name">UserName</label>
                <input className='input' value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="UserName" id="name" name="name" />
                <label className='label' htmlFor="password">Password</label>
                <input className='input' value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <label className='label' htmlFor="password1">Repeat Password</label>
                <input className='input' value={password1} onChange={(e) => setPass1(e.target.value)} type="password1" placeholder="********" id="password1" name="password1" />
                <button className='register' type="submit">Register</button>
            </form>
            <a className="log-link-btn" onClick={() => navigate('/')}>Do have an account? Login here.</a>
        </div>
    )
};

export { Register };