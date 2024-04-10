 import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import { IoClose } from "react-icons/io5";
import { FaShoppingCart  } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Ratings from '../components/Rating/Ratings';
import { context } from '../App';


const ProductPageCopy = () => {
        const { id } = useParams();
    const [response, setResponse] = useState([])
    const [colorsArr, setColors] = useState([{imageuri: "sample", color: "black data",item_count: 0}]);
    const [ratings, setRatings] = useState([]);
    const [category, setCategory] = useState('');
    const [user, setUser] = useState([]);
    const [stars, setStars] = useState(0);
    const [specsArr, setSpecs] = useState([{specs: ""}])
    const [count, setCount] = useState(1);
    const [orderPopup, setOrderPopup] = React.useState(false);


    const {setSuccessToggle,setFailedToggle, setPopUpContent} = useContext(context);

      const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
let colors ;
const changeColor = (ID) => {
    console.log("Before", colorsArr);
    const element = colorsArr.find(item => item.color === ID.target.value);
    
    // Create a new array with the element removed
    const newArray = colorsArr.filter(item => item.color !== ID.target.value);
    
    // Re-insert the element at the start of the array
    newArray.unshift(element);
    
    console.log("After", newArray);
    setColors(newArray);
}
let specs ;
const changespec = (ID)=>{
    console.log("Before", colorsArr);
    const element = specsArr.find(item => item.specs === ID.target.value);
    const newArray = specsArr.filter(item => item.specs !== ID.target.value);
    newArray.unshift(element);
    console.log("After", newArray);
    setSpecs(newArray);

}
    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/products/${id}`);
                setResponse(res.data.products || {});
                setColors(res.data.colors || []);
                setCategory(res.data.category.name || []);
                console.log(res.data);
                setSpecs(res.data.specs || {});
                // fetching ratings
                await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/fetch-ratings/${id}`)
                .then( res => {
                    console.log(res.data);
                    setRatings(res.data.ratings);
                    setUser(res.data.customers);
                    let sum = 0;
                    res.data.ratings.map((e)=>{
                        sum += e.review
                    });
                    let avg = parseFloat(sum/res.data.ratings.length);
                    if(!avg) avg =0;
                    setStars(avg.toFixed(2));
                    
                })
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

  const AddCount = ()=>{
    if(count < colors.item_count){
        setCount(count+1);
    }
    console.log(colors)
  }
  const SubtractCount = ()=>{
    if(count > 1){
        setCount(count-1);
    }
  }

const AddtoWishlist = async()=>{
try{
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/add-to-wishlist/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(res.data);
        setPopUpContent('Successfully added to wishlist');
        setSuccessToggle(true);
}
catch(err){
    setPopUpContent('Product already added to wishlist');
    setFailedToggle(true);
    console.log(err);}
}

const AddtoCart= async()=>{

try{
    
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/add-to-cart/${id}?count=${count}&color=${colors.color}&specs=${specs.specs}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(res.data);
        setPopUpContent('Successfully added to cart');
        setSuccessToggle(true);
}
catch(err){
    setPopUpContent('Already added to cart');
    setFailedToggle(true);
    throw new Error(err);}

  }
    colors  = colorsArr[0];
        
    specs = specsArr[0];
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden relative md:h-[1000px] lg:h-auto lg:pb-10">
    <Navbar handleOrderPopup={handleOrderPopup} />
    <div className=' px-8'> <Link to='/Products' className='block md:hidden p-2 max-w-12 rounded-sm dark:bg-gray-800 '><IoClose className='text-3xl'/></Link></div>
    {response && 
    <div className='md:flex m-5'>
        <div className='md:w-1/2 mt-10'>
            <img src={`${import.meta.env.VITE_SERVER_URL}/images/${colors.imageuri}`} className='w-full  object-cover' alt="Product Image" />
        </div>


        <Link to='/Products' className='hidden md:block absolute right-5 p-2 dark:bg-gray-800 '><IoClose className='text-3xl'/></Link>
        <div className='md:w-1/2 ml-5 text-sm dark:text-stone-400 space-y-4 mt-10 overflow-hidden'>
            <div className='font-Medium  text-3xl dark:text-white'>{response.name}</div>
            <div className='text-lg font-light dark:text-white'>Available Specs:</div>
            <div className='flex space-x-2'>
                {specsArr.map( e=>
                    <div className={`border-[1px] px-4 rounded-md py-[2px]  cursor-pointer ${specs.specs === e.specs ? ' text-brandYellow border-brandYellow': 'border-stone-500'}`}>
                        <button  onClick={changespec} value={e.specs}>{e.specs}</button>
                    </div>
                )}
            </div>
            
            <div className='text-lg font-light dark:text-white'>Available Colors:</div>
            <div className='space-x-2'>{colorsArr.map(e=>{
                return <button onClick={changeColor} value={e.color}
                className={`border-[1px] px-4 py-[2px] rounded-md  cursor-pointer ${colors.color === e.color ? 'border-brandYellow text-brandYellow': 'border-stone-500'}`}>
                    {e.color}</button>
            })}</div>
            <div className='text-lg font-light dark:text-white'>Items Left:</div>
            <div>{colors.item_count}</div>
            <div className='text-lg font-light dark:text-white'>Category:</div>
            <div>{category}</div>
            <div className='text-md font-light   space-x-3'><span className='dark:text-white text-lg'>
                Quantity</span>
            <span onClick={SubtractCount} className='text-3xl cursor-pointer'>-</span>
            <span className='text-white text-lg'>{count}</span>
            <span onClick={AddCount}  className='text-3xl cursor-pointer'>+</span>
            </div>
            <div className='text-2xl font-medium dark:text-white relative pl-3 mb-20'>
                <span className='text-sm absolute left-0'>$</span>{specs.price ? specs.price : response.price}</div>
            <button className='disabled:opacity-50 bg-secondary px-10 py-2 rounded-[2px] text-white font-light text-xl space-x-8 mt-20'
        onClick ={()=>{AddtoCart()}} disabled={colors.item_count==0}><span>Add to Cart</span> <FaShoppingCart  className='inline text-xl' /></button>
            <button className='disabled:opacity-50 bg-secondary px-5 py-2 rounded-[2px] text-white font-light text-xl space-x-8 ml-2'
        onClick ={()=>{AddtoWishlist()}} disabled={colors.item_count!==0}> <FaRegHeart  className='inline text-xl' /></button>
        </div>
        
    </div>}
    <div className='p-5 rounded-lg m-5 dark:bg-gray-500 bg-gray-200'>
        <div className='text-2xl font-light dark:text-white'>Ratings:</div>
        <span className='text-4xl font-bold text-black dark:text-white'>{stars ? stars : 0}</span><span className='mt-4 text-gray-400 ml-2'>out of 5</span>
        <div className='flex'>
            <Ratings stars={stars}/><div className='text-gray-100 pt-1 px-5'>{ratings?.length}<span className='pl-2'>Ratings</span></div> 
        </div>
        
        <div className='dark:text-brandYellow mt-10'>{ratings.map(
            (e, i) => {
                return (
                    <div key={i} className='flex items-center space-x-2 pb-4'>
                        <img src={ 'https://i.pinimg.com/564x/eb/87/8e/eb878e8e1b26850ab4093d4d6818fe8b.jpg'} className='w-10 h-10 mb-16 rounded-full' alt="User Image" />
                        <div className='flex flex-col'>
                            
                            <div className='text-xl font-semibold dark:text-brandYellow '>@{user[i].name}</div>
                            <Ratings stars={ratings[i].review}/>
                            <div className=' dark:text-white m-2'>{ratings[i].comment}</div>
                            {ratings[i].reply && <><div>Reply:</div><div className=' dark:text-gray-300 ml-5 text-sm'>{ratings[i].reply}</div></>}
                        </div>
                    </div>
                )
            }
        )}</div>
        <div className='text-2xl font-light dark:text-white'>description:</div>
        <div className='dark:text-brandYellow'>{response.desc}</div>

    </div>

</div>
  )
}

export default ProductPageCopy