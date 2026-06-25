import React, {useState, useEffect}  from 'react' ;
import axios from "axios";
import { useAuth } from '../../authContext';

import "./auth.css";
import logo from "../../assets/github-icon.svg"
const Signup = ()=>{
    const  { setCurrentUser} = useAuth();

useEffect(()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("userId");
    setCurrentUser(null);
},[]);

const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleSingup = async (e)=>{
e.preventDefault();
try{
    setLoading(true);
    const res = await axios.post("http://3.27.14.214:3002/signup",{
        email:email,
        username:username,
        password:password
    });
    
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.userId);

    setCurrentUser(res.data.userId);
    setLoading(false);

    window.location.href = "/";

   
}
catch(err){
    console.error(err);
    alert("Signup Failed");
    setLoading(false);
};
}
return(
    <div className= "login-wrapper">
        <div className="login-logo-container">
            <img src={logo} alt="Logo" className="logo-login" />
        </div>

        <div className="login-box-wrapper">
            <div className="login-heading">
               <h1 className="login-title">Sign In</h1>
            </div>
            <div className="login-box">
                <div>
                    <label  className="label">Username</label>
                    <input type="text" autoComplete='off' name='Username' className='input' id='Username' value={username}  onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div>
                    <label  className="label">Email address</label>
                    <input autoComplete='off' name='Email' id='Email' className='input' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="div">
                    <label  className="label">Password</label>
                    <input type="password" autoComplete='off' name='Password' className='input' id='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

               <button
    className="login-btn"
    onClick={handleSingup}
    disabled={loading}
>
    {loading ? "Signing up..." : "Signup"}
</button>
            </div>
            <div className="pass-box">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    </div>
)
}

export default Signup;
