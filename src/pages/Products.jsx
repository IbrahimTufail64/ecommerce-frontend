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
  const [search, setSearch] = useState('');
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
              
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/products/?search=M2&category=${category}&price=${price}&page=${page}`);
                setResponse(res.data.products);
                setColors(res.data.colors);
                localStorage.setItem("colors", JSON.stringify(res.data.colors)); // Storing colors in localStorage
            } catch (err) {
                console.error(err);
            }
}
const handleNext = async(e) => {
  e.preventDefault();
  setPage(page+1);

}
const handlePrevious = async(e) => {
  e.preventDefault();
  setPage(page-1);
            
}

useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(page);
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/products/?category=${category}&price=${price}&page=${page}`);
                setResponse(res.data.products);
                setColors(res.data.colors);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
}, [page]); 

const handleSearch = async(e)=>{
  e.preventDefault();
  try {
                
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/products-search/?search=${search}&page=${page}`);
                setResponse(res.data.products);
                setColors(res.data.colors);
                localStorage.setItem("colors", JSON.stringify(res.data.colors)); // Storing colors in localStorage
            } catch (err) {
                console.error(err);
            }
}

console.log(response)

  return (
   <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
    <Navbar handleOrderPopup={handleOrderPopup} />
    {/* Search Bar section */}
            <form className="relative group mx-10 my-5" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder=" Search"
                className="search-bar px-10 mb-8 md:mb-0"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                
              />
              <input type='submit' value='Search' className='block md:inline-block rounded-full ml-5 px-16 py-1 bg-secondary text-white cursor-pointer duration-200 hover:bg-slate-600'/>
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-[15px] md:top-1/2 -translate-y-1/2 left-3 duration-200" />
              
            </form>
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
        <div className='m-3 text-2xl font-light'>Categories</div>
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
        
        <div className='m-3 text-2xl font-light'>Price</div>
      <div className='m-4'>
        <div class="flex items-center mb-4">
            <input type="radio" id="html" name="price" value="100" onChange={e => setPrice(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">0-$100</label>
        </div>
        <div class="flex items-center mb-4">
            <input type="radio" id="css" name="price" value="300" onChange={e => setPrice(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">100-$300</label>
        </div>
        <div class="flex items-center mb-4">
            <input type="radio" id="1000" name="price" value="1000" onChange={e => setPrice(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">300-$1000</label>
        </div>
        <div class="flex items-center">
            <input type="radio" id="2000" name="price" value="2000" onChange={e => setPrice(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">&lt;$1000</label>
        </div>
        
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
      src={`${import.meta.env.VITE_SERVER_URL}/images/${colors.find(color => color !== null && color.product_id === product.id).imageuri}`}
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