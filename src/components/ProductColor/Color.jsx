import React, { useState } from 'react'
import '../../index.css';
import axios from 'axios';

const Color = ({color,count,setCount,setColor,index,imageurl,setImageUrl}) => {
    const [image,setImage] = useState('');

    const indexation = `${index+1} of ${color.length}`

    const uploadImage = async(e)=>{
        e.preventDefault();
        setImage(e.target.files[0])
        try{
            console.log(image);
            const formData = new FormData();
            formData.append('image',image);
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/app/upload-image`,formData,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then( e => {
            const images = [...imageurl];
            images[index] = e.data.filename;
            setImageUrl(images)
            console.log(e.data.filename);
        })
        .catch(e=> console.log(e))
        }
        catch(e){
            throw new Error(e);
        }
    }

    const changeColor = (e)=>{
        const newColor = [...color];
        newColor[index] = e.target.value;
        setColor(newColor);
    }

    const changeCount = (e)=>{
        const newCount = [...count];
        newCount[index] = e.target.value;
        setCount(newCount);
    }
  return (  
    <div>
        <label className="">Color</label>
            <input type="text"  required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
                value={color[index]}
                onChange={(e)=>{changeColor(e)}}
            />
            <label className="">Count</label>
            <input type="number" min='1'  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
                value={count[index]}
                onChange={(e)=>{changeCount(e)}}
            />
            <form>  
                
                <input
                    type="file"
                    name={index}
                    id={index}
                    class="opacity-0 absolute w-0 h-0"
                    onChange={(e) => uploadImage(e)}
                    accept="image/png, image/jpg, image/jpeg"
                    />
                    <label
                    for={index}
                    class="text-white bg-primary inline-block cursor-pointer font-bold text-lg px-4 py-2 hover:bg-red-600"
                    >
                    Choose thumbnail
                    </label>
                    <div className='flex justify-between'>
                        {image && <div className='mb-10'>{image.name}</div>}
                        <div className='mb-10 text-slate-500'>{indexation}</div>
                    </div>
                
            </form>
    </div>
  )
}

export default Color