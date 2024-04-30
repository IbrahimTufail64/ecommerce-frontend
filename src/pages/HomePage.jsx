import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Carasoul from '../components/Carasoul/Carasoul';
import Slide1 from '../components/CarasoulComponents.jsx/Slide1';
import slide1 from '../assets/slide1.png'
import slide2 from '../assets/cameraTint.png'
import slide3 from '../assets/laptopSlide.png'
import controller from '../assets/controllerOrig.jpg'
import pixel from '../assets/pixelOrig.png'
import jacket from '../assets/jacket.jpg'
import laptop from '../assets/laptop.png'
import DJI from '../assets/DJIBanner.png'
import Strip from '../assets/Strip.png'


import { MdOutlineShoppingCart } from "react-icons/md";
import { FiHeadphones } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import ProductsHome from '../components/ProductsHome/ProductsHome';
import Products from '../components/Products/Products';
import Timer from '../components/TimerBanner/Timer';

const HomePage = () => {
    
    const [orderPopup, setOrderPopup] = React.useState(false);
    

    

    const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const slides = [
    <Slide1 content={'Amazing Bass and Sound'} image={slide1}/>,
    <Slide1 content={'Experience the World Through New Eyes'} image={slide2}/>,
    <Slide1 content={'Technology as the Enabler'} image={slide3}/>
  ]
  

  return (
    <div className='dark:bg-[#111827] font-inter overflow-hidden'>
        <Navbar handleOrderPopup={handleOrderPopup} />
        <Carasoul slides={slides}/>
        
        <div className='bg-[#18233A]  w-full grid grid-cols-2 pr-[90px] md:pr-[40px] md:flex justify-between p-10 md:px-16 text-center ' >
            <div >
                <MdOutlineShoppingCart size={30} className=' ml-12 md:ml-8 '/>
                <div className='text-md opacity-55 mt-2 '>Vast Inventory</div>
            </div>
            <div>
                <FiHeadphones size={30} className=' ml-12 md:ml-12 '/>
                 <div className='text-md opacity-55 mt-2 '>24/7 customer service</div>
            </div>
            <div>
                <TbTruckDelivery size={30} className=' ml-12 md:ml-12 mt-3 md:mt-0'/>
                 <div className='text-md opacity-55 mt-2 '>Fast and Free Shipping</div>
            </div>
            <div>
                <MdOutlinePayments size={30} className=' ml-12 md:ml-12  mt-3 md:mt-0'/>
                 <div className='text-md opacity-55 mt-2 '>Safe Transactions</div>
            </div>
            <div>
                <MdOutlineKeyboardReturn size={30} className=' ml-12 md:ml-12  mt-3 md:mt-0'/>
                 <div className='text-md opacity-55 mt-2 '>Money Back Gauarantee</div>
            </div>
        </div>
        {/* banner section no. 1 */}
        <div className='flex m-10 mb-5 space-x-5 mx-6'>
          <div className='w-[50vw] relative rounded-sm overflow-hidden'>
            <div className='absolute top-16 left-12 w-[30vw]'>
              <div className='text-[45px] font-regular text-white'>New Dual Scense Controllers</div>
               <button
                className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                Shop Now
            </button>
            </div>
            <img src={controller} alt='banner' className=''/>
          </div>

          <div>
            <div className='relative h-[57%] rounded-sm overflow-hidden'>
              <div className='absolute top-16 left-12 w-[30vw]'>
                  <div className='text-[45px] font-regular text-white'>The New Google Pixel 7</div>
                      <button
                        className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                        Shop Now
                    </button>
                </div>
              <img src={pixel}/>
            </div>

            <div className='flex space-x-3 mt-[21px]'>
              <div className='w-[48%] overflow-hidden rounded-sm relative'>
                  <div className='absolute top-8 left-5 w-[65%]'>
                  <div className='text-[25px] font-medium text-black'>Hoodies to match your vibe</div>
                      <button
                        className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                        Shop Now
                    </button>
                </div>
              <img src={jacket}/>
              </div>
              <div className='w-[49%] overflow-hidden rounded-sm relative'>
                  <div className='absolute top-8 left-5 w-[65%]'>
                  <div className='text-[25px] font-medium text-white'>Pocketable gaming beast</div>
                      <button
                        className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                        Shop Now
                    </button>
                </div>
              <img src={laptop}/>
              </div>
              
            </div>
          </div>

        </div>

        {/* Banner section no. 2 */}
        <div className='w-full relative'>
          <div className='top-[50px] left-[50px] absolute'>
                <div className=' w-[40%] text-[50px] md:text-[60px] font-inter font-regular text-white'>Discover the World with DJI enhanced Arial Photography</div>
                 <button
                    className='text-2xl bg-white mt-4  px-12 py-4 border-[2px] font-semibold rounded-sm text-white border-white hover:border-none bg-transition2'>
                    Shop Now
                </button>
            </div>
          <img src={DJI}/>
        </div>

        <div className='w-full my-10 relative'>
          <div className='absolute h-full items-center flex w-full justify-center text-white font-semibold text-5xl'>Get Additional Discount on Debit Card</div>
          <img src={Strip}/>
        </div>
        <div>
          
          {/* <ProductsHome/> */}
          <Products/>
        </div>
        {/* banner no. 3  */}
        <Timer/>
        
        <Footer/>
    </div>
    
  )
}

export default HomePage