import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const history = useNavigate();

    function hasNumber(myString) {
        return /\d/.test(myString);
      }

    var [formData, setFormData] = useState({
        userid: null,
        username: '',
        degree: 'CS',
        phonenum: 123123123
    })

    const {userid, username, degree, phonenum} = formData

    const clickHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            console.log(body)
            const res = await axios.post("http://127.0.0.1:8000/register", body, config);
            
            const response = res.data
            console.log(res.data)
            if (response.data === "success"){
                console.log(response.data)
                const propValue = userid;
                history(`/chatbot/${propValue}`);
            }

            else{
                alert(response.data)
            }
            

            } catch (err) {
                console.log(err)
            }
    };

    const onChange = e => {
        if(e.target.name === "userid" || e.target.name === "phonenum"){
            setFormData({...formData, [e.target.name]:  parseInt(e.target.value, 10)});
        }
        else{
            setFormData({...formData, [e.target.name]: e.target.value});
            // console.log(console.log(formData))
        }

    };

    
 


    return(
        <>
            <div id="preloader"></div>
            <div className="login-page-wrap">
                <div className="login-page-content">
                    <div className="login-box">
                        {/* <div className="item-logo"> 
                            <img src="assets\img\logo2.png" alt="logo"/>
                        </div> */}
                        <form action="index.html" className="login-form"  onSubmit={clickHandler}>
                            <div className="form-group">
                                <label>ID</label>
                                <input type="number" placeholder="Enter ID" name="userid" value={userid} onChange={e => onChange(e)}
                                   className="form-control" required/>
                                <i className="far fa-envelope"></i>
                            </div>
                        
                           <div className="form-group">
                                <label>Username</label>
                                <input type="text" placeholder="Enter username" name="username" value={username} onChange={e => onChange(e)}
                                   className="form-control" required/>
                                <i className="far fa-envelope"></i>
                            </div>
{/* 
                           <div className="form-group">
                                <label>Degree</label>
                                <input type="text" placeholder="Enter Degree" name="degree" value={degree} onChange={e => onChange(e)}
                                   className="form-control" required/>
                                <i className="far fa-envelope"></i>
                            </div>

                            
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="phonenumber" placeholder="Enter phone number" name="phonenum" value={phonenum} onChange={e => onChange(e)}
                                   className="form-control" required/>
                                <i className="fas fa-lock"></i>
                            </div>
 */}
                            

                            <div className="form-group d-flex align-items-center justify-content-between">
                            </div>
                            <div className="form-group">
                                <button type="submit" className="login-btn" onClick={e => clickHandler(e)}>Sign Up</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;