import axios from 'axios';

import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!(Email && password)){throw new Error('All fields are required');}
    try {
        await axios.post(" http://localhost:3000/api/user/login", {
          email:Email,
          password
        }).then(function (response) {
        //   setUser(response.data.user);
        console.log(response.data);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("Email", Email);
        localStorage.setItem("token", response.data.token);
          alert("Login successful");
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
        const cookieString = document.cookie;
        console.log(cookieString);
        
       
      } catch (error) {
        console.error("Error sending request:", error);
      }


    
  };

  return (

    <main className="md:flex h-[650px]" >
        
     <div className='p-10  pt-[50px] pl-20 backdrop-blur-md  md:w-2/5 bg-[#111827] h-full'>
      {/* <div className='text-white'>Logo</div> Logo */}
        <form onSubmit={handleSubmit}>
        <p className="mt-6  text-3xl md:text-5xl pb-10 font-light text-primary h-full">
            Sign in
          </p>
            <label className="text-white">Email</label>
            <input type="text"  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}/>
            <label className="text-white">password</label>
            <input type="password" className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white   border-gray-400  bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <button
    type='Submit'
    className='bg-primary mt-4 md:px-24 px-10 py-2 border-[1px] font-semibold rounded-sm text-primary border-primary bg-transition'>
    Sign in
</button>
        <div className='text-white pt-5'>Don't have an account?<Link className='pl-2 text-primary' to='/SignUp'>Sign up</Link></div>
        </form>
    </div>
    <div className='w-3/5 hidden md:block'>
        <img src='https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg?w=740&t=st=1708345830~exp=1708346430~hmac=e4f40ce6a4163d2e68877990674f375ee7f2cb1b55f49fab964bd2f4f99191e8'/>
    </div>
            </main>
  );
};

export default LoginForm;