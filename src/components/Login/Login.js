import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css"
import axios, { AxiosError } from "axios";

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPass] = useState('');
    const [anonimRole, setnonimRole] = useState('0');
    const navigate = useNavigate();
    const api = "https://localhost:7223/api"
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            name,
            password,
        };
        if (anonimRole === '2') {
            navigate('/main-page', {
                state: {
                    UserName: 'anonim',
                    UserRole: '2'
                }
            });
        } else {
            const response = fetch(`${api}/Authorize/SignIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
                .then(response => response.json())
                .then(responseData => {
                    let status = responseData.status;
                    let message = responseData.message;
                    if (status === 'Ok') {
                        console.log(responseData.message);
                        navigate('/main-page', {
                            state: {
                                UserName: name,
                                UserRole: message
                            }
                        });
                    } else if (status = 'Error') {
                        alert("Неправильний логін або пароль");
                    }
                })
                .catch(error => {
                    console.error('Помилка:', error);
                });
        }

    }



    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className='label' htmlFor="name">UserName</label>
                <input className='input' value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="UserName" id="name" name="name" />
                <label className='label' htmlFor="password">Password</label>
                <input className='input' value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button className='login' type="submit">Login</button>
                <button className='login' onClick={(e) => setnonimRole('2')} onSubmit={handleSubmit}>Stay anonim</button>
            </form>
            <a className="reg-link-btn" onClick={() => navigate('/register')}>Do have an account? Register here.</a>
        </div>
    )
};

export { Login };