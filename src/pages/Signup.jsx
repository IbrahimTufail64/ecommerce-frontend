import axios from 'axios';

import React, { useState,useEffect, useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { context } from '../App';


const Signup = () => {
  const [Email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const {setSuccessToggle,setFailedToggle, setPopUpContent} = useContext(context); 
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!(Email && password)){throw new Error('All fields are required');}
    try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {
          email:Email,
          password,
          name,
          address
        }).then(function (response) {
        //   setUser(response.data.user);
        console.log(response.data);
        localStorage.setItem("UserName", response.data.name);
        localStorage.setItem("Email", Email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("Address", response.data.address);
        localStorage.setItem("Seller", response.data.isSeller);
          setPopUpContent('Successfully Signed up!');
    setSuccessToggle(true);
          navigate("/");
        })
        .catch(function (error) {
          setPopUpContent('Invalid Field or Input!');
    setFailedToggle(true);
          console.log(error);
        });
        const cookieString = document.cookie;
        console.log(cookieString);
        
       
      } catch (error) {
        setPopUpContent('Server Error!');
    setFailedToggle(true);
        console.error("Error sending request:", error);
      }


    
  };

  return (

    <main className="md:flex h-[900px] bg-white" >
        
     <div className='p-10  pt-[150px] pl-20 backdrop-blur-md  md:w-2/5 bg-[#111827] h-full'>
      {/* <div className='text-white'>Logo</div> Logo */}
        <form onSubmit={handleSubmit}>
        <p className="mt-6  text-3xl md:text-5xl pb-10 font-light text-primary h-full">
            Sign up
          </p>
            <label className="text-white">UserName</label>
            <input type="text"  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
            <label className="text-white">Email</label>
            <input type="text"  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}/>
            <label className="text-white">password</label>
            <input type="password" className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white   border-gray-400  bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <label className="text-white">address</label>
            <input type="text" className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white   border-gray-400  bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}/>

            <button
    type='Submit'
    className='bg-primary mt-4 md:px-24 px-10 py-2 border-[1px] font-semibold rounded-sm text-primary border-primary bg-transition'>
    Sign up
</button>
        <div className='text-white pt-5'>Already have an account?<Link className='pl-2 text-primary' to='/Login'>Sign in</Link></div>
        </form>
    </div>
    <div className='w-3/5 hidden md:block mt-[150px]'>
        <img src='https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg?w=740&t=st=1708345830~exp=1708346430~hmac=e4f40ce6a4163d2e68877990674f375ee7f2cb1b55f49fab964bd2f4f99191e8'/>
    </div>
            </main>
  );
};

export default Signup;