import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../App';

const ProductBanner = ({props,sum,setSum}) => { 
    const prop = props.props;
    const {orderinfo,setOrderinfo} = useContext(context);
    const [count,setCount] = useState(prop.itemcount);
    const [check,setCheck] = useState(false);

    
    
const handleOrder = (state) => {
  
  const currentOrder = { order:prop, count };
  console.log(state.target)


  if (!state.target.checked) {
    const index = orderinfo.findIndex(order => order.order === prop); 
    const updatedOrder = [...orderinfo];
    updatedOrder.splice(index, 1); // Remove the item at the found index
    console.log("removed",updatedOrder);
    setOrderinfo(updatedOrder);
    console.log((count * prop.specs.price));   
    setSum(Math.abs(sum - (count * prop.specs.price)) );
  } else {
    const updatedOrder = [...orderinfo, currentOrder];
    setOrderinfo(updatedOrder);
    console.log("added",updatedOrder);
    setSum(sum+(count * prop.specs.price));
    console.log(orderinfo);
  }
  setCheck(!check);
};

const handleRemove= async()=>{ 
    try{
        await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/app/remove-product-cart/${prop.Product.id}`,
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                if(check){handleOrder()}
                window.location.reload();
    }
    catch (e) {
        console.log(e);
    }

}

  return (
    <div className='lg:flex px-10 my-10 md:space-x-5'>
                  
                  <div className=''>
                    <img src={`${import.meta.env.VITE_SERVER_URL}/images/${prop.color ? prop.color.imageuri : ''}`} className='w-full md:w-40 md:h-40 object-cover mb-10 md:mb-0'/>
                  </div>
                  <div>
                    <div className='text-2xl text-primary'>{prop.Product.name}</div>
                    <div className='md:flex lg:space-x-[200px] md:space-x-[70px]'>
                      <p className='w-[300px] text-slate-500'>{prop.Product.desc}</p>
                      <div className='text-md font-light  cursor-pointer space-x-3'>
                          <span onClick={()=> {if(count > 1&&!check){setCount(count-1)}}} >-</span>
                          <span>{count}</span>
                          <span onClick={()=> {if(count< prop.color.item_count &&!check){setCount(count+1)}}}>+</span>
                      </div>
                      <div className='flex space-x-3'>
                        <span className='pt-3'>Selected: </span>
                        <input type="checkbox"  onClick={(state)=>{handleOrder(state)}} ></input>
                      </div>  
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

export default ProductBanner