import React, {Fragment} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';
import SignUp from "./Layout/SignUp";
import Login from "./Layout/Login";
import Chatbot from "./Layout/Chatbot";

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return(
    // <Provider store={store}>
      <Router>
        <Fragment>
            <section className = "container">
              <Routes>
                <Route path="/login" element={<Login/>}/>      
                <Route path="/signup" element={<SignUp/>}/>   
                <Route path="/chatbot/:propValue" element={<Chatbot/>}/>         
              </Routes>
            </section>
          </Fragment>
        </Router>
      // </Provider>
  )
  } 
// import logo from './logo.svg';
// import './App.css';
// import axios from 'axios'
// import React, {useEffect, useState} from 'react'


// function App() {

//   var [user, setUser] = useState({
//     phoneNum: 12121,
//     degree: "sdsd",
//     userId: 12212,
//     userName: "sdfsfs"
// })

// const data = {
//   "user_id": 0,
//   "user_name": "string",
//   "degree": "string",
//   "phone_num": 0
// }



// // const data = {
// //   userId: 12212,
// //   userName: "sdfsfs",
// //   degree: "sdsd",
// //   phoneNum: 12121
// // }

// // const user = {
// //   "user": {
// //     phoneNum: 12121,
// //     degree: "sdsd",
// //     userId: 12212,
// //     userName: "sdfsfs"
// //   }
// // }
//   useEffect(()=> {
//     async function getJobs(){
//     // try{
//     //     const res = await axios.get("http://127.0.0.1:8000/test/1")
//     //     console.log(res.data)
//     // }
//     // catch(err){
//     //   console.log(err)

//     // }}

//   // console.log(user)
//   try{
      
//       const config = {
//           headers: {
//               'Content-Type': 'application/json',
//               // Authorization: `Bearer ${token}`
//           }
//       };
//       const body = JSON.stringify(user)
//       console.log(body)
//       // const res = await axios.get("http://127.0.0.1:8000/register")

//       const res = await axios.post("http://127.0.0.1:8000/register", data, config)
//       // console.log(res)

//       console.log(res)
//   }

//   catch(err){
//       console.log(err.response)
//   }}

//     getJobs();
// },[]);
  
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


