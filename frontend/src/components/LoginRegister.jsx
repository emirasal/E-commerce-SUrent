import "./login.css";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button} from "./Button";

function LoginRegister(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [registerSurName, setRegisterSurName] = useState("");
    const [registerTaxId, setRegisterTaxId] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerAddress, setRegisterAddress] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");
    const [error, setError] = useState("");
    const [registerError, setRegisterError] = useState("");


    const navigate = useNavigate();

    const handleChangeRegisterName = (event) => {
        setRegisterName(event.target.value)
    }
    const handleChangeRegisterSurName = (event) => {
        setRegisterSurName(event.target.value)
    }

    const handleRegisterTaxId = (event) => {
        setRegisterTaxId(event.target.value)
    }

    const handleRegisterPassword = (event) => {
        setRegisterPassword(event.target.value)
    }
    const handleRegisterEmail = (event) => {
        setRegisterEmail(event.target.value)
    }

    const handleRegisterAddress = (event) => {
        setRegisterAddress(event.target.value)
    }
    const handleRegisterPhone = (event) => {
        setRegisterPhone(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginSubmit = async (event) => {
        setError("")
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/logIn", {
                email,
                password,
            });

            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.userId);
            axios.post("http://localhost:8080/api/updateCartUserId", {
                cartId: localStorage.getItem('cartId')
            }, {headers: {
                userId: response.data.userId
            }});
            navigate('/');
            window.location.reload()
        } catch (error) {
            await setError(error.response.data.message)
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/signUp", {
                "name": registerName,
                "surname": registerSurName,
                "address": registerAddress,
                "email": registerEmail,
                "phone": registerPhone,
                "password": registerPassword,
                "taxId": registerTaxId
            });
            console.log(response)
            navigate('/login');
            window.location.reload()
        } catch (error) {
            await setRegisterError(error.response.data.message)
        }
    }

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3">
                                    <span>Log In </span><span>Sign Up</span>

                                </h6>

                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="reg-log"
                                    name="reg-log"
                                />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    {error ? <div className="alert alert-danger">{error} </div> : ""}
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-style"
                                                            placeholder="Email"
                                                            onChange={handleEmailChange}
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            className="form-style"
                                                            placeholder="Password"
                                                            onChange={handlePasswordChange}
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <button
                                                            onClick={handleLoginSubmit} className="btN mt-4"
                                                        >Login
                                                        </button>
                                                    </div>
                                                    <Button destination="/AdminLogin" buttonStyle="btn--adjust">Admin</Button>
                                                    <p className="mb-0 mt-4 text-center">
                                                        <a href="https://www.google.com/" className="link"
                                                        >Forgot your password?</a
                                                        >
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-3 pb-3" id="js--signuptext">Sign Up</h4>
                                                    {registerError ?
                                                        <div className="alert alert-danger">{registerError} </div> : ""}
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Name"
                                                            onChange={handleChangeRegisterName}
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Surname"
                                                            onChange={handleChangeRegisterSurName}
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Full Name"
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Tax ID"
                                                            onChange={handleRegisterTaxId}
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="email"
                                                            className="form-style"
                                                            placeholder="Email"
                                                            onChange={handleRegisterEmail}
                                                        />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Home Address"
                                                            onChange={handleRegisterAddress}
                                                        />
                                                        <i className="input-icon uil uil-home"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Phone"
                                                            onChange={handleRegisterPhone}
                                                        />
                                                        <i className="input-icon uil uil-home"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            className="form-style"
                                                            placeholder="Password"
                                                            onChange={handleRegisterPassword}
                                                        />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button
                                                        href="https://www.google.com/"
                                                        className="btN mt-4"
                                                        id="js--registerbutton"
                                                        onClick={handleRegisterSubmit}>Register
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default LoginRegister;