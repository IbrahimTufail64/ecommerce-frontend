import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import { IoMdSearch } from 'react-icons/io'
import { TiArrowSortedDown } from "react-icons/ti";

import Footer from '../components/Footer/Footer'
const Products = () => {
    const [response, setResponse] = useState([])
    const [colors, setColors] = useState([])
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('0');
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState(false);

    const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

const handleSubmit = async(e) => {
  e.preventDefault();
            try {
              
                const res = await axios.get(`http://localhost:3000/app/products/?search=M2&category=${category}&price=${price}&page=${page}`);
                setResponse(res.data.products);
                setColors(res.data.colors);
                localStorage.setItem("colors", JSON.stringify(res.data.colors)); // Storing colors in localStorage
            } catch (err) {
                console.error(err);
            }
}
const handleNext = async(e) => {
  e.preventDefault();
            try {
                setPage(page+1);
                const res = await axios.get(`http://localhost:3000/app/products/?search=M2&category=${category}&price=${price}&page=${page}`);
                setResponse(res.data.products);
                setColors(res.data.colors);
                localStorage.setItem("colors", JSON.stringify(res.data.colors)); // Storing colors in localStorage
            } catch (err) {
                console.error(err);
            }
}
const handlePrevious = async(e) => {
  e.preventDefault();
            try {
                setPage(page-1);
                const res = await axios.get(`http://localhost:3000/app/products/?search=M2&category=${category}&price=${price}&page=${page}`);
                setResponse(res.data.products);
                setColors(res.data.colors);
                localStorage.setItem("colors", JSON.stringify(res.data.colors)); // Storing colors in localStorage
            } catch (err) {
                console.error(err);
            }
}

useEffect(() => {
        const fetchData = async () => {
            try {
                
                const res = await axios.get(`http://localhost:3000/app/products/?search=&category=${category}&price=${price}&page=${page}`);
                setResponse(res.data.products);
                setColors(res.data.colors);
                localStorage.setItem("colors", JSON.stringify(res.data.colors)); // Storing colors in localStorage
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []); 

// console.log(response.length)

  return (
   <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
    <Navbar handleOrderPopup={handleOrderPopup} />
    <div className='lg:flex py-2 md:py-10'>
      <div className='bg-primary m-5 font-bold flex justify-between text-lg lg:hidden py-2 px-5 rounded-sm cursor-pointer' 
      onClick={()=>setHover(!hover)}>
        <p>Filter</p>
      <TiArrowSortedDown className={`mt-1 text-2xl ${hover && 'rotate-180'}`} />
      </div>
      <div className={`lg:w-1/6 mx-10 mt-4 relative lg:block ${hover ? 'block border-white' : 'hidden'}`}>
        <div className='hidden lg:block absolute bg-slate-300 w-[1px] h-[400px] right-0 top-5'></div>
        
        <form onSubmit = {handleSubmit}>
          <div className='m-3 mb-5 font-bold text-lg' >Filter</div>
        <div className='m-3'>Categories</div>
        <div className="relative group ">
              <input
                type="text"
                placeholder="Search"
                className="
              px-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white
              "
              onChange={(e) => setCategory(e.target.value)}
              />
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 left-[180px] duration-200" />
        </div>
        
        <div className='m-3'>Price</div>
      <div className='m-4'>
        <input type="radio" id="html" name="price" value="100" onChange={e => setPrice(e.target.value)}/>
            <label for="100" className='text-slate-500 mr-10 ml-2'>0-$100</label>
          <input type="radio" id="css" name="price" value="300" onChange={e => setPrice(e.target.value)}/>
          <label for="300" className='text-slate-500 ' >100-$300</label><br/>
          <input type="radio" id="1000" name="price" value="1000" onChange={e => setPrice(e.target.value)}/>
          <label for="1000" className='text-slate-500 mr-5 ml-2'>300-$1000</label>
          <input type="radio" id="2000" name="price" value="2000" onChange={e => setPrice(e.target.value)}/>
          <label for="2000" className='text-slate-500 '>&lt;$1000</label>
      </div>
        <input type='submit' value='Search' className='rounded-full mt-5 ml-5 px-16 py-1 bg-secondary text-white cursor-pointer'/>
        </form>
      </div>
      

      <div className='grid md:grid-cols-3 m-4'>
      {
        response.map(product => 
        <Link className=' min-w-[200px] h-[300px] mx-3 dark:bg-[#333C4E] bg-[#e6e6e6] rounded-md cursor-pointer mb-5' to={`/Product-page/${product.id}`}>
            {colors.find(color => color !== null && color.product_id === product.id) && (
  <div>
    <img
      className='w-full h-[200px] rounded-t-md object-cover'
      src={colors.find(color => color !== null && color.product_id === product.id).imageuri}
    />
  </div>
)}
            <div className='px-4 py-5 pb-2'>
              <div className='font-bold text-xs'>{product.name}</div>
              <div className=' text-[10px] dark:text-slate-200 flex pt-7 justify-between pr-2'>
                <div>{product.type.name}</div>
                <div>${product.price}</div>
              </div>
            </div>
        </Link>)    
    }
    
    </div>
    </div>
    <div className='text-white flex space-x-10 lg:ml-[600px] ml-10 mb-10'>
      <button className='disabled:opacity-50 bg-secondary px-10 py-1 rounded-md'
       disabled={page == 1} onClick ={handlePrevious} >Previous</button>
      <button className='disabled:opacity-50 bg-secondary px-10 py-1 rounded-md'
       disabled={response.length < 9 } onClick ={handleNext}>Next</button> 
    </div>
    <Footer/>
    </div>
  )
}

export default Products