import React, { useEffect, useState } from 'react'
import Color from '../components/ProductColor/Color';
import { IoAddOutline } from "react-icons/io5";
import { FaSquareMinus } from "react-icons/fa6";
import Specs from '../components/ProductSpecs/Specs';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/SideBar/Sidebar';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const [prodName, setProdName] = useState('');
    const [category, setCategory] = useState(''); 
    const [desc, setDesc] = useState('');
    const [color, setColor] = useState(['']);
    const [imageurl, setImageUrl] = useState(['']);
    const [specs, setSpecs] = useState(['']);
    const [price, setPrice] = useState([1]);
    const [count, setCount] = useState([1]);
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

const { id } = useParams()


const fetchProducts = async()=>{
    try{
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/products/${id}`);
        setProdName(res.data.products.name);
        setDesc(res.data.products.desc);
        const colorName =  res.data.colors.map((a)=> a.color)
        setColor(colorName)
        setCount([...res.data.colors.map((a)=> a.item_count)])
        setImageUrl([...res.data.colors.map((a)=> a.imageuri)]);
        setSpecs([...res.data.specs.map((a)=> a.specs)])
        setPrice([...res.data.specs.map((a)=> a.price)])
        console.log(res.data);
        const Category = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/category/${res.data.products.typeId}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCategory(Category.data.name)
                console.log(Category.data);
                // setSpecs(res.data.specs || {});
    }
    catch(err){
        console.log(err);
    }
}


 const createProduct = async(e)=>{
        e.preventDefault();
        console.log('imageuri',imageurl);
        console.log(color.join('|'));
        try{
            if(price[0]==1 || count[0] == 1 || color[0]=='' || imageurl[0]=='' || specs[0]==''){ throw new Error('fields not fully filled out')}
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/edit-product/${id}`,{
                name: prodName,
                price: price.join('|'),
                count: count.join('|'),
                desc: desc,
                category: category,
                color: color.join('|'),
                URI: imageurl.join('|'),
                specs: specs.join('|')
            },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then( e => {
            console.log(e.data)
        })
        .catch(e=> console.log(e.data))
        }
        catch(e){
            throw new Error(e);
        }
    }

useEffect(()=>{
    fetchProducts();
},[])



    const createColor = () =>{
        setColor([...color,'']);
        setCount([...count,1]);
        setImageUrl([...imageurl,'']);
        console.log(color,count);
    }
    const deleteColor = (e) =>{
        e.preventDefault();
        let temp = color;
        temp.pop();
        setColor([...temp]);
        temp = count;
        temp.pop();
        setCount([...temp]);
        temp = imageurl
        temp.pop();
        setImageUrl([...temp]);
        console.log(color,count);
    }

    

    const createSpecs = () =>{
        setSpecs([...specs,'']);
        setPrice([...price,1]);
        console.log(specs,price);
    }

    const deleteSpecs = (e) =>{
        e.preventDefault();
        setSpecs([...specs.slice(0,specs.length-1)]);
        setPrice([...price.slice(0,specs.length-1)]);
        console.log(specs,price);
    }



  return (
      <div className="bg-black text-white duration-200 overflow-hidden">
      <div className='hidden'><Navbar handleOrderPopup={handleOrderPopup} /></div>     
        {/* Sidebar  */}

<Sidebar/>

<div class="p-4 sm:ml-64">
    <div className='text-4xl font-bold pt-8 px-8'>Edit Product</div>
   <form className='text-white bg-dashboardPrimary p-10 lg:w-[800px] mt-5 rounded-3xl'> 
            <label className="">Product Name</label>
            <input type="text" required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none w-full focus:z-10 sm:text-sm"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            />
            <label className="">Category</label>
            <input type="text" required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none w-full focus:z-10 sm:text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <label className="">Description</label>
            <textarea required className=" appearance-none h-[100px] my-5 relative block md:w-full px-3 py-2 border-2 resize-none text-white border-gray-400 bg-inherit focus:outline-none w-full focus:z-10 sm:text-sm"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}

            />
            <div className='flex space-x-10'>
                            {/* Color */}
            <div className='w-1/2'>
                <div className='flex justify-between'>
                <div className='font-semibold text-2xl mb-5 '>Colors</div>
                <div className='flex space-x-3'>
                    <button className='cursor-pointer disabled:opacity-40' disabled={color.length <=1}
                onClick={(e)=>{deleteColor(e)}}
                ><FaSquareMinus className='text-white size-12'/></button>
                <div className='bg-[#FFFFFF] h-[40px] rounded-md pb-6 mt-2 cursor-pointer '
                onClick={()=>{createColor()}}
                ><IoAddOutline className='text-tertiary size-10' /></div>
                </div>
            </div>           
            {color.map((e,index)=>{
                return <Color color={color} count={count} setColor={setColor} setCount={setCount} index={index} imageurl={imageurl} setImageUrl={setImageUrl}/> 
            })}
            </div>
            {/* Specs */}
            <div className='w-1/2'>
                <div className='flex justify-between'>
                <div className='font-semibold text-2xl mb-5 '>Specs</div>   
                <div className='flex space-x-3'>
                <button className='cursor-pointer disabled:opacity-40' disabled={specs.length <=1}
                onClick={(e)=>{deleteSpecs(e)}}
                ><FaSquareMinus className='text-white size-12'/></button>
                <div className='bg-[#FFFFFF] w-[40px] h-[40px] rounded-md pb-6 cursor-pointer mt-2'
                onClick={()=>{createSpecs()}}
                ><IoAddOutline className='text-tertiary size-10' /></div>
                </div> 
            </div>
            {specs.map((e,index)=>(
                <Specs specs={specs} setSpecs={setSpecs} price={price} setPrice={setPrice} index={index}/>
            ))}
            </div>
            </div>
            <button type='submit' className=' my-5 bg-dashboardSecondary py-2 px-7 text-3xl lg:ml-[230px] block mt-24' onClick={(e)=>{createProduct(e)}}>
                Edit Product
            </button>
        </form> 
</div>
{/* sidebar end   */}
    </div>
  )
}

export default EditProduct