import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import { IoClose } from "react-icons/io5";
import { FaShoppingCart  } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const ProductPage = () => {
    
    const { id } = useParams();
    const [response, setResponse] = useState([])
    const [colorsArr, setColors] = useState([])
    const [specsArr, setSpecs] = useState([])
    const [count, setCount] = useState(1);
    const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  const AddCount = ()=>{
    if(count < colors.item_count){
        setCount(count+1);
    }
  }
  const SubtractCount = ()=>{
    if(count > 1){
        setCount(count-1);
    }
  }
  const AddtoCart= async()=>{

try{
    const res = await axios.get(`http://localhost:3000/app/add-to-cart/${id}?count=${count}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(res.data);
}
catch(err){throw new Error(err);}

  }

useEffect(() => {
    const fetchData = async () => {
            try { 
    const res = await axios.get(`http://localhost:3000/app/products/${id}`);
    console.log("data",res);
    if(res.data){
    localStorage.setItem("products_id",res.data.products);
    localStorage.setItem("colors",res.data.colors);
    localStorage.setItem("specs",res.data.specs);
    }

    
} catch (err) {
    console.error(err);
}
        };

        fetchData();
    }, []); 
    setResponse(localStorage.getItem('products_id'));
    setColors(localStorage.getItem('colors'));
    setSpecs(localStorage.getItem('specs'));

let colors = colorsArr[0];
console.log(colorsArr);
const changeColor = (ID)=>{
    colors = colorsArr.find(item => item.color === ID.target.value);
    console.log(colors);
}
let specs = specsArr[0];
const changespec = (ID)=>{
    specs = specsArr[ID];
}
setTimeout(() => {
    console.log("Data recieved", response,colors,specs)
}, 1000);

  return ( 

    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden relative md:h-[800px]">
    <Navbar handleOrderPopup={handleOrderPopup} />
    {response && 
    <div className='md:flex m-5'>
        <div className='md:w-1/2 mt-10'>
            <img src={colors.imageuri? colors.imageuri: ''} className='w-full  object-cover' alt="Product Image" />
        </div>


        <Link to='/Products' className='hidden md:block absolute right-5 p-2 dark:bg-gray-800 '><IoClose className='text-3xl'/></Link>
        <div className='md:w-1/2 ml-5 text-sm dark:text-stone-400 space-y-4 mt-10 overflow-hidden'>
            <div className='font-Medium  text-3xl dark:text-white'>{response.name}</div>
            {specs.specs && (
                    <div>
                        <div className='text-lg font-light dark:text-white'>Specs:</div>
                        <div>{specs.specs}</div>
                    </div>
                )}
            <div className='text-lg font-light dark:text-white'>description:</div>
            <div>{response.desc}</div>
            <div className='text-lg font-light dark:text-white'>Available Colors:</div>
            <div className='space-x-2'>{colorsArr.map(e=>{
                return <button onClick={changeColor} value={e.color}
                className='border-[1px] px-4 py-[2px] rounded-md border-stone-500 cursor-pointer'>
                    {e.color}</button>
            })}</div>
            <div className='text-lg font-light dark:text-white'>Items Left:</div>
            <div>{colors.item_count}</div>
            <div className='text-md font-light  cursor-pointer space-x-3'><span className='dark:text-white'>
                Quantity</span>
            <span onClick={SubtractCount} >-</span>
            <span>{count}</span>
            <span onClick={AddCount}>+</span>
            </div>
            <div className='text-2xl font-medium dark:text-white relative pl-3 mb-20'>
                <span className='text-sm absolute left-0'>$</span>{specs.price ? specs.price : response.price}</div>
            <button className='disabled:opacity-50 bg-secondary px-10 py-2 rounded-[2px] text-white font-light text-xl space-x-8 mt-20'
        onClick ={AddtoCart} disabled={colors.item_count==0}><span>Add to Cart</span> <FaShoppingCart  className='inline text-xl' /></button>
            <button className='disabled:opacity-50 bg-secondary px-5 py-2 rounded-[2px] text-white font-light text-xl space-x-8 ml-2'
        onClick ={console.log("clicked")} disabled={colors.item_count==0}> <FaRegHeart  className='inline text-xl' /></button>
        </div>
        
    </div>}
</div>
  )
}


export default ProductPage