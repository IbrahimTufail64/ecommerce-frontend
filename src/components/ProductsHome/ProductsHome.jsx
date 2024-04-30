import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductsHome = () => { 

     const [response, setResponse] = useState([])
    const [colors, setColors] = useState([]) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/products/?category=''&price=0&page=1`);
                setResponse(res.data.products);
                setColors(res.data.colors);
                console.log(res.data)
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
}, []); 
  return (
    <div>
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
  )
}

export default ProductsHome