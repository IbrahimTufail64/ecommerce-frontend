import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Order = ({order}) => {

    const [customer, setCustomer] = useState({name: 'Loading...'});

     const fetchcustomer =async ()=>{
        try{
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/customer/${order.customer_id}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                // console.log(res.data)
                setCustomer(res.data.customer)
            })
        }
        catch(err){
            throw new Error(err);
        }
    }

    useEffect(()=>{
        fetchcustomer();
    },[])
    
  return (
    <div className='text-2xl  p-2  flex flex-wrap space-x-3'>
        <span className='px-2 text-dashboardSecondary font-semibold'>{customer.name}</span> ordered {
            order.product_id.map((pro,idx) => (
                
                <span className='flex space-x-2 flex-wrap'>
                    <span>{order.quantity[idx]}</span>
                    <Prodcut product_id={pro}/>
                    <span >for ${order.price[idx]} each,</span>
                </span>
            ))
        }</div>
  )
}

export default Order




const Prodcut = ({product_id})=>{
    const [product, setProduct] = useState('');

    const fetchProduct = async()=>{
        try{
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/products/${product_id}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                // console.log(res.data);
                setProduct(res.data.products.name)
            })
        }
        catch(err){
            throw new Error(err);
        }
    }
    useEffect(()=>{
        fetchProduct();
    },[])
    return (
        <span className=' text-dashboardSecondary'>{product}</span>
    )
}