import React, { Fragment, useRef, useState } from 'react';
import "./LoginSignUp.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const LoginSignUp = () => {

    const navigate=useNavigate();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const loginSubmit = async(e) => {
        e.preventDefault();
        
        try{
        
            const config={headers:{"Content-Type":"application/json"}};
    
            await axios.post(`/api/v1/login`,{email:loginEmail,password:loginPassword},config);
    
            navigate("/compiler");
            
        }catch(error){
            navigate("/");
        }
     
    }

    const registerSubmit = async(e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);


        try{  
    
            const config={headers:{"Content-Type":"application/json"}};
    
            await axios.post(`/api/v1/register`,myForm,config);
            
            navigate("/compiler");
    
        }catch(error){
            navigate("/");
        }
    };

    const registerDataChange = (e) => {
            setUser({ ...user, [e.target.name]: e.target.value });
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }

    };

    return (
        
                <Fragment>
                    <div className='LoginSignUpContainer'>
                        <div className='LoginSignUpBox'>
                            <div>
                                <div className='login_signUp_toggle'>
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>

                                <div className='loginEmail'>
                                    
                                    <input type="email" placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                </div>

                                <div className='loginPassword'>
                                    
                                    <input type="password" placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>

                                <input type="submit" value="Login" className='loginBtn' />

                            </form>

                          
                            <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>

                                <div className='signUpName'>
                                    
                                    <input type="text" placeholder='Name' required name="name" value={name} onChange={registerDataChange} />
                                </div>

                                <div className='signUpEmail'>
                                  
                                    <input type="email" placeholder='Email' required name="email" value={email} onChange={registerDataChange} />
                                </div>

                                <div className='signUpPassword'>

                                    <input type="password" placeholder='Password' required name="password" value={password} onChange={registerDataChange} />
                                </div>

                                <input type="submit" value="Register" className='signUpBtn' />

                            </form>

                        </div>
                    </div>
                </Fragment>
    )
}

export default LoginSignUp
