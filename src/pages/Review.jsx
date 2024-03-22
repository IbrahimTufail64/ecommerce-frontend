import React, { useContext, useEffect, useState } from 'react'
import { context } from '../App';
import Navbar from '../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import axios from 'axios';

const Review = () => { 
    const {rating, setRatings} = useContext(context); 
    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(0);
    const [orderPopup, setOrderPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{if(!rating.order_id) {navigate('/orders')} },[])
    const handleOrderPopup = () => {
            setOrderPopup(!orderPopup);
        };
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        rating.comment = comment;
        rating.review = stars;
        console.log(rating) 
        try{
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/app/review`, rating,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
            .then((res) => {
                    console.log(res)
                })
            .catch((err) => {
                    console.log(err)
                })
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
    <Navbar handleOrderPopup={handleOrderPopup} /> 
    <form onSubmit={handleSubmit} className='p-10'>
        <p className="mt-6  text-3xl md:text-5xl pb-10 font-light text-primary h-full">
            Review Page
          </p>
            <div  className="text-primary text-2xl mb-4">Post as: {localStorage.getItem('UserName')}</div>
            {/* Rating System */}
            <label className="text-white">Leave a Rating</label>
            <div class="flex items-center m-5">
                <svg class={`w-4 h-4 ${stars >=1 ? 'text-yellow-300': 'text-gray-800'}  ms-1 cursor-pointer`} onClick={()=>{setStars(1)}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class={`w-4 h-4 ${stars >=2 ? 'text-yellow-300': 'text-gray-800'} ms-1 cursor-pointer`} onClick={()=>{setStars(2)}}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class={`w-4 h-4 ${stars >=3 ? 'text-yellow-300': 'text-gray-800'} ms-1 cursor-pointer`} onClick={()=>{setStars(3)}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class={`w-4 h-4 ${stars >=4 ? 'text-yellow-300': 'text-gray-800'} ms-1 cursor-pointer`} onClick={()=>{setStars(4)}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class={`w-4 h-4 ${stars ==5 ? 'text-yellow-300': 'text-gray-800'} ms-1 cursor-pointer`} onClick={()=>{setStars(5)}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            
            <label className="text-white">Review</label>
            <textarea required className=" appearance-none my-5 relative block md:w-full px-3 py-2 border-2 resize-none text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />

            <button
                type='Submit'
                className='bg-primary mt-4 md:px-24 px-10 py-2 border-[1px] font-semibold rounded-sm text-primary border-primary bg-transition'>
                Submit Review
            </button>
       
        </form>
        <Footer/>
    </div>
  )
}

export default Review