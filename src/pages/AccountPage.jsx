import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductBanner from '../components/CartProduct/ProductBanner';
import ProductBannerWishlist from '../components/WishlistProduct/ProductBannerWishlist';

const AccountPage = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [UserName, setUserName] =  useState(localStorage.getItem('UserName')); 
  const [Email, setEmail] =  useState(localStorage.getItem('Email')); 
  const [Address, setAddress] =  useState(localStorage.getItem('Address')); 
  const [wishlist, setWishlist] =  useState([]); 
  const [sum,setSum] = useState(0);
  const [orderinfo,setOrderinfo] = useState([]);
  const [cart,setCart] = useState([

  ]);

  const navigate = useNavigate();
  if(!localStorage.getItem('Email')) navigate('/');
  
useEffect(()=>{
  const fetchCart = async()=>{
    try{
    await axios.get(
  "http://localhost:3000/app/cart",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }
).then(e => setCart(e.data.cart))


    await axios.get(
  "http://localhost:3000/app/wishlist",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }
).then(e => setWishlist(e.data.wishlist))
localStorage.setItem('CartSize',wishlist.length);
console.log(wishlist);
  }
  catch(e){
    console.log(e);
    // navigate('/Login');
  }
  }
  fetchCart();
},[])
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  const handleSubmit = async(e)=>{
     e.preventDefault();
    try {
await axios.post(
  "http://localhost:3000/api/user/update-account",
  {
    email: Email,
    name: UserName,
    address: Address
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }
).then(function (response) {
        console.log(response.data);
          alert("Profile Edited!");
        })
        .catch(function (error) {
          console.log(error);
          alert("Please Login again to continue");
          navigate("/Login");
        });       
      } catch (error) {
        console.error("Error sending request:", error);
      }
  }

const handleLogout = async(e)=>{
        e.preventDefault();
        console.log(localStorage.getItem('token'))
    try {
await axios.get(
  "http://localhost:3000/api/user/logout",
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }
).then(function (response) {
        localStorage.setItem('token','');
        localStorage.setItem('UserName','');
        localStorage.setItem('Email','');
        localStorage.setItem('Address','');
        alert("Successfully LogedOut!");
        navigate('/'); 
        })
.catch(e => console.log(e));
   
      } catch (error) {
        console.error("Error sending request:", error);
      }
  }
console.log(cart);

  return (
     <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
    <Navbar handleOrderPopup={handleOrderPopup} />
    <div className='md:flex md:flex-row mx-20 my-10'>
        <div className='text-primary md:w-1/2 space-y-5'>
            <div className='text-4xl font-semibold mb-10'>Profile</div>
            <form onSubmit={handleSubmit}>
                <label className="">UserName</label>
            <input type="text" required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 dark:text-white text-gray-800 border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            />
                <label className="">Email</label>
            <input type="text" required  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 dark:text-white text-gray-800 border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            />
                <label className="">Address</label>
            <input type="text" required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 dark:text-white text-gray-800 border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            />
            
            <button
                type='Submit'
                className='bg-primary mt-4 md:px-24 px-12 py-2 border-[1px] font-semibold rounded-sm text-primary border-primary bg-transition'>
                Edit Profile
            </button>
            </form>
            <button
                onClick={handleLogout}
                className='bg-primary mt-4 md:px-28 px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                Logout
            </button>
        </div>
        <div className='md:w-1/2 w-full mt-10 '>
            <img src='https://i.ibb.co/7JXTm21/Profile-Img-P.png'/>
        </div>
    </div>
    <div className='px-10'>
      <div className='text-4xl font-semibold text-primary mb-5 mt-16'>Cart</div>
      <div className='flex justify-between '>
        <div className='pt-8'>Sub Total: ${Math.abs(sum)}</div>
        <button
                onClick={console.log('')}
                className='bg-primary mt-4 px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                Checkout
            </button>
      </div>
      {cart.length>0 && cart.map(e=>{ 
        return <ProductBanner props={{props:e}} sum={sum} setSum={setSum} orderinfo={orderinfo} setOrderinfo={setOrderinfo}/>
      })}
    </div>


    <div className='px-10'>
      <div className='text-4xl font-semibold text-primary mb-5 mt-16'>Wishlist</div>
      {wishlist.length > 0 && wishlist.map(e=>{ 
        return <ProductBannerWishlist prop={e}/>
      })}
    </div>

    <Footer/>
    </div>
  )
}

export default AccountPage

