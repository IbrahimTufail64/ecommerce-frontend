import React, { useState } from 'react'
import Color from '../components/ProductColor/Color';
import { IoAddOutline } from "react-icons/io5";
import Specs from '../components/ProductSpecs/Specs';

const Create = () => {
    const [prodName, setProdName] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [color, setColor] = useState(['']);
    const [imageurl, setImageUrl] = useState(['']);
    const [specs, setSpecs] = useState(['']);
    const [price, setPrice] = useState([0]);

    const createColor = () =>{
        setColor([...color,'']);
        setCount([...count,0]);
        console.log(color,count);
    }
  return (
    <div className='md:px-[150px] py-16 relative '>
        <div className='text-tertiary font-semibold text-4xl '>
            Create Product
        </div>
        <div className='text-white bg-tertiary p-10 lg:w-[800px] mt-5 rounded-3xl'> 
            <label className="">Product Name</label>
            <input type="text"  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            />
            <label className="">Category</label>
            <input type="text"  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <label className="">Description</label>
            <textarea  className=" appearance-none my-5 relative block md:w-full px-3 py-2 border-2 resize-none text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
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
                onClick={()=>{createColor()}}
                ><IoAddOutline className='text-tertiary size-10' /></div>
            </div>
            <Specs/>
            <button className=' my-5 bg-primary py-2 px-7 text-3xl lg:ml-[230px] block mt-24' onClick={(e)=>{console.log('ibrahim')}}>
                Create Product
            </button>
        </div>
    </div>
  )
}

export default Create