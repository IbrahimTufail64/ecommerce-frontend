import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductBanner from '../components/CartProduct/ProductBanner';
import ProductBannerWishlist from '../components/WishlistProduct/ProductBannerWishlist';
import { context } from '../App';
import Success_popup from '../components/PopUp_Messages/Success_popup';
import Fail_popup from '../components/PopUp_Messages/Fail_popup';
import notFound from '../assets/notFound.png'

const AccountPage = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [UserName, setUserName] =  useState(localStorage.getItem('UserName')); 
  const [Email, setEmail] =  useState(localStorage.getItem('Email')); 
  const [Address, setAddress] =  useState(localStorage.getItem('Address')); 
  const [wishlist, setWishlist] =  useState([]); 
  const [sum,setSum] = useState(0);
  const [cart,setCart] = useState([]);
  const {orderinfo,setOrderinfo} = useContext(context);


    const {setSuccessToggle,setFailedToggle, setPopUpContent} = useContext(context);
  

  const navigate = useNavigate();
  if(!localStorage.getItem('Email')) navigate('/');
  
useEffect(()=>{
  console.log(localStorage.getItem('Seller'))
  const fetchCart = async()=>{
    try{
    await axios.get(
  `${import.meta.env.VITE_SERVER_URL}/app/cart`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }
).then(e => setCart(e.data.cart))


    await axios.get(
  `${import.meta.env.VITE_SERVER_URL}/app/wishlist`,
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
  `${import.meta.env.VITE_SERVER_URL}/api/user/update-account`,
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
        localStorage.setItem("UserName", response.data.name);
        localStorage.setItem("Email", response.data.email);
        localStorage.setItem("Address", response.data.address);
        setPopUpContent('Profile Updated!');
        setSuccessToggle(true);
        console.log(localStorage.getItem("UserName"));
        })
        .catch(function (error) {
          console.log(error);
          setPopUpContent('Can not update Profile, you might be logged out!');
          setFailedToggle(true);
          navigate("/Login");
        });       
      } catch (error) {
        console.error("Error sending request:", error);
      }
  }

const handleLogout = async(e)=>{
        e.preventDefault();
    try {
await axios.get(
  `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
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
.catch(e => {
  setPopUpContent('Server Error! unable to log out!');
        setFailedToggle(true);
});
   
      } catch (error) {
        setPopUpContent('Server Error! unable to log out!');
        setFailedToggle(true);
        console.error("Error sending request:", error);
      }
  }
const handleCheckOut = async()=>{
  // console.log(import.meta.env.SERVER_URL)
  try{
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/app/checkout`,{
    items: orderinfo
  }
  ,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then( e=> {
    alert('For testing use card 4242-4242-4242-4242')
    window.location = e.data.url;});
  }
  catch(e){
    throw new Error(e)
  }
}

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
        <div className='pt-8 text-2xl font-light'>Sub Total: ${Math.abs(sum)}</div>
        <button
                onClick={()=>{handleCheckOut()}}
                className='bg-primary mt-4 px-12 py-2 text-xl font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                Checkout
            </button>
      </div>
      {cart.length>0 ? cart.map(e=>{ 
        return <ProductBanner props={{props:e}} sum={sum} setSum={setSum} />
      }): <div className='flex justify-center '>
            <div className=''><img src={notFound} />
                <div className='my-10 text-3xl font-light text-center'>Try Adding something to your cart!</div>
            </div>
        </div>}
    </div>


    <div className='px-10'>
      <div className='text-4xl font-semibold text-primary mb-5 mt-16'>Wishlist</div>
      {wishlist.length > 0 ? wishlist.map(e=>{ 
        return <ProductBannerWishlist prop={e}/>
      }): <div className='flex justify-center '>
            <div className=''><img src={notFound} />
                <div className='my-10 text-3xl font-light text-center'>Try Adding something to your wishlist!</div>
            </div>
        </div>}
    </div>

    <Footer/>
    {/* <Fail_popup openWindow={failedToggle} setOpenWindow={setFailedToggle} content={popUpContent}/>
    <Success_popup openWindow={successToggle} setOpenWindow={setSuccessToggle} content={popUpContent}/> */}
    </div>
  )
}

export default AccountPage

