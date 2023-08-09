import React, {useState} from 'react';
// import { Navigate } from "react-router-dom";
// import {connect} from 'react-redux';
// import {setAlert} from '../../actions/alert';
// import { loginSuccess, loginFail } from '../../actions/register';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const history = useNavigate();


    var [formData, setFormData] = useState({
        user_id: '',
        user_name: ''
    })


    const {user_id, user_name} = formData

 
    const onChange = e => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onClick = async(e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            console.log(body)
            const res = await axios.post("http://127.0.0.1:8000/login", body, config);
            
            const response = res.data
            console.log(res.data)
            if (response.data === "success"){
                console.log(response.data)

                const propValue = user_id;
                history(`/chatbot/${propValue}`);
            }
            else{
                alert(response.data)
            }
            

            } catch (err) {
                console.log(err)
            }
    };


    
    return(
        <>
            <div id="preloader"></div>
            <div className="login-page-wrap">
                <div className="login-page-content">
                    <div className="login-box">
 
                        <form action="index.html" className="login-form">
                            <div className="form-group">
                                <label>User ID</label>
                                <input type="number" placeholder="Enter ID" name="user_id" value={user_id} onChange={e => onChange(e)}
                                   className="form-control" required/>
                                <i className="fas fa-lock"></i>
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" placeholder="Enter username" name="user_name" value={user_name} onChange={e => onChange(e)}
                                   className="form-control" required/>
                                <i className="far fa-envelope"></i>
                            </div>
                            <div className="form-group">
                                <button className="login-btn" onClick={e => onClick(e)} >Login</button>
                            </div>
                            
                        </form>
                   
                    </div>
                    <div className="sign-up">Don't have an account ? <a href="signup">Signup now!</a></div>
                </div>
            </div>
        </>
    )    
}


export default Login;