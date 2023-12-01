import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./AdminLogin.css"

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/logInAdmin', { email, password });
            const data = response.data;
            
            // I am assuming that your API returns a message telling whether the user is a 'prod_man' or not.
            if(data.message === 'Logged in successfully') {
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem("isAdmin",true);
                console.log("User is admin");
                navigate('/');
                window.location.reload()
            } else {
                console.log("User is not admin");
                await setError(error.response.data.message)
            }
    
        } catch (error) {
            await setError(error.response.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <h2>Admin Login</h2>
                    {error ? <div className="alert alert-danger">{error} </div> : ""}
                    <div className="form-item">
                        <input type="text" id="email" autoComplete="off" required onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">email</label>
                    </div>
                    
                    <div className="form-item">
                        <input type="password" id="password" autoComplete="off" required onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className='adminNbtn'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin;
