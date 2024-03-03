import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';

const Orders = () => {
        const [orderPopup, setOrderPopup] = useState(false); 
        const [orders, setOrders] = useState([]);

        const handleOrderPopup = () => {
            setOrderPopup(!orderPopup);
        };
        const fetchData = async()=>{
            try{
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/get-orders`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
            }).then(response => {
                setOrders(response.data);
                console.log(response.data);
            });
            
            }
            catch(err){
                throw new Error(err);
            }
            }
        useEffect(()=>{
            
            fetchData();
        },[])
  return ( 
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden ">
    <Navbar handleOrderPopup={handleOrderPopup} />
    <div className='px-7'>
      <div className='text-4xl font-semibold text-primary mb-5 mt-16'>Order History</div>
      {orders.map((order, index) => { let sum = 0;
      
        return (
            <div key={index} className='space-y-4 border-primary border-b-2 py-10  mb-10'>
          <div className='md:flex md:space-x-10'>
            <p className=' text-lg font-semibold '>Order ID: <p className='text-slate-500 font-medium text-sm break-all'>{order.order_id} </p> </p>
            <p className=' text-lg font-semibold'>Address: <div className='text-slate-500 font-medium text-sm break-all'> {order.address}</div> </p>
            <p className=' text-slate-500 font-medium text-lg pt-5'> {new Date(order.time).toLocaleDateString()}</p>
          </div>
          <div className='text-xl font-semibold  mb-5 mt-16'>Prducts Detail</div>
          {order.product_id.map((productId, idx) => { sum = sum + order.quantity[idx]*order.price[idx]
            return (
                <div key={idx} className=' m-5'>
              <p className='  font-semibold pb-5'>Product ID:<span className='text-primary px-5'>{productId}</span></p>
              <p className='  font-semibold pb-5'>Price: <span className='text-primary px-5'> {order.price[idx]}</span></p>
              <p className='  font-semibold pb-5'>Quantity:<span className='text-primary px-5'>{order.quantity[idx]}</span> </p>
            </div>
            )
      })}
        <p className='  font-semibold pb-5'>Sub Total:<span className='text-primary px-5'>{sum}</span> </p>
        </div> 
        )
})}
          
    </div>
    <Footer/>
    </div>
  )
}

export default Orders