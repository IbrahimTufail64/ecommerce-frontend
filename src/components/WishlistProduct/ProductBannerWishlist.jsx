import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductBannerWishlist = ({prop}) => {
    const [product,setProduct] = useState({
    products: {
        name: "Sample Dat",
        desc: "Sample Data",
    },
    colors: [
        {
            color: "Sample Dat",
            imageuri: "Sample Dat"
        }
    ]
});
    console.log(prop.product_id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/app/products/${prop.product_id}`);
                setProduct(res.data);
                console.log("product ",product)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const handleRemove= async()=>{ 
    try{
        await axios.delete(
                `http://localhost:3000/app/remove-product-wishlist/${prop.product_id}`,
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                window.location.reload();
    }
    catch (e) {
        console.log(e);
    }

}
  return (
        <div className='lg:flex px-10 my-10 md:space-x-5'>
                  
                  <div className=''>
                    <img src={product.colors[0] ? product.colors[0].imageuri : ''} className='w-full md:w-40 md:h-40 object-cover mb-10 md:mb-0'/>
                  </div>
                  <div>
                    <div className='text-2xl text-primary'>{product.products.name}</div>
                    <div className='md:flex lg:space-x-[200px] md:space-x-[70px]'>
                      <p className='w-[300px] text-slate-500'>{product.products.desc}</p> 
                    </div>
            <button
                onClick={()=>{handleRemove()}}
                className='bg-primary mt-4 px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                Remove Item
            </button>
                  </div>
                </div>
  )
}

export default ProductBannerWishlist