import React, { useState } from 'react'
import Color from '../components/ProductColor/Color';
import { IoAddOutline } from "react-icons/io5";
import Specs from '../components/ProductSpecs/Specs';
import axios from 'axios';


const Create = () => {
    const [prodName, setProdName] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [color, setColor] = useState(['']);
    const [imageurl, setImageUrl] = useState(['']);
    const [specs, setSpecs] = useState(['']);
    const [price, setPrice] = useState([1]);
    const [count, setCount] = useState([1]);

    const createColor = () =>{
        setColor([...color,'']);
        setCount([...count,1]);
        setImageUrl([...imageurl,'']);
        console.log(color,count);
    }

    const createSpecs = () =>{
        setSpecs([...specs,'']);
        setPrice([...price,1]);
        console.log(specs,price);
    }
    
    const createProduct = async(e)=>{
        e.preventDefault();
        console.log('imageuri',imageurl);
        console.log(color.join('|'));
        try{
            if(price[0]==1 || count[0] == 1 || color[0]=='' || imageurl[0]=='' || specs[0]==''){ throw new Error('fields not fully filled out')}
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/app/create-product`,{
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
  return (
    <div className='md:px-[150px] py-16 relative '>
        <div className='text-tertiary font-semibold text-4xl '>
            Create Product
        </div> 

        <form className='text-white bg-tertiary p-10 lg:w-[800px] mt-5 rounded-3xl'> 
            <label className="">Product Name</label>
            <input type="text" required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            />
            <label className="">Category</label>
            <input type="text" required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <label className="">Description</label>
            <textarea required className=" appearance-none my-5 relative block md:w-full px-3 py-2 border-2 resize-none text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}

            />
            {/* Color */}
            <div className='flex justify-between'>
                <div className='font-semibold text-2xl mb-5 '>Colors</div>
                <div className='bg-[#FFFFFF] w-[40px] h-[40px] rounded-md pb-6 cursor-pointer'
                onClick={()=>{createColor()}}
                ><IoAddOutline className='text-tertiary size-10' /></div>
            </div>           
            {color.map((e,index)=>{
                return <Color color={color} count={count} setColor={setColor} setCount={setCount} index={index} imageurl={imageurl} setImageUrl={setImageUrl}/>
            })}
            {/* Specs */}
            <div className='flex justify-between'>
                <div className='font-semibold text-2xl mb-5 '>Specs</div>
                <div className='bg-[#FFFFFF] w-[40px] h-[40px] rounded-md pb-6 cursor-pointer'
                onClick={()=>{createSpecs()}}
                ><IoAddOutline className='text-tertiary size-10' /></div>
            </div>
            {specs.map((e,index)=>(
                <Specs specs={specs} setSpecs={setSpecs} price={price} setPrice={setPrice} index={index}/>
            ))}
            <button type='submit' className=' my-5 bg-primary py-2 px-7 text-3xl lg:ml-[230px] block mt-24' onClick={(e)=>{createProduct(e)}}>
                Create Product
            </button>
        </form>
    </div>
  )
}

export default Create