import React, { useEffect, useRef, useState } from 'react'
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
import { motion, useAnimation, useInView } from 'framer-motion';
import Loading from '../components/Loader/Loading';
import { Link } from 'react-router-dom';

const HomePage = () => {
    
    const [orderPopup, setOrderPopup] = React.useState(false);
    const [AnimateControl, setAnimateControl] = React.useState(false);
    const controllerRef = useRef(null); 
    const BannerRef = useRef(null); 
    const isInView = useInView(controllerRef);
    const BannerInView = useInView(BannerRef);
    const mainControls = useAnimation();
    const secondControls = useAnimation();
    useEffect(()=>{
      if(isInView){mainControls.start('visible')}
      else{mainControls.start('hidden')}

      if(BannerInView){secondControls.start('visible')}
      else{secondControls.start('hidden')}

    },[isInView,BannerInView]);
    

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
        
        <div className='bg-slate-200 dark:bg-[#18233A] mt-10  w-full grid grid-cols-2 space-x-8 md:space-x-0 pr-[90px] md:pr-[40px] md:flex justify-between p-10 md:px-16 text-center ' >
            <div className='pl-5 md:pl-0'>
                <MdOutlineShoppingCart size={30} className=' ml-12 md:ml-8 '/>
                <div className='text-md opacity-55 mt-2 '>Vast Inventory</div>
            </div>
            <div>
                <FiHeadphones size={30} className=' ml-8 md:ml-12 '/>
                 <div className='text-md opacity-55 mt-2 '>24/7 customer service</div>
            </div>
            <div>
                <TbTruckDelivery size={30} className=' ml-8 md:ml-12 mt-3 md:mt-0'/>
                 <div className='text-md opacity-55 mt-2 '>Fast and Free Shipping</div>
            </div>
            <div>
                <MdOutlinePayments size={30} className=' ml-8 md:ml-12  mt-3 md:mt-0'/>
                 <div className='text-md opacity-55 mt-2 '>Safe Transactions</div>
            </div>
            <div>
                <MdOutlineKeyboardReturn size={30} className=' ml-8 md:ml-12  mt-3 md:mt-0'/>
                 <div className='text-md opacity-55 mt-2 '>Money Back Gauarantee</div>
            </div>
        </div>
        {/* banner section no. 1 */}
        <div className='md:flex md:m-10 mb-5 md:space-x-5 md:mx-6 mt-10 mx-3'>
          <div  className='md:w-[50vw] relative rounded-sm overflow-hidden'>
            <div className='absolute top-16 left-12 w-[70vw] md:w-[30vw] z-0'
            >
              <motion.div ref={controllerRef} className='text-[30px] md:text-[45px] font-regular text-white'
                variants={{
                        hidden:{opacity:0,y:75},
                        visible:{opacity:1,y:0},
                    }}
                    initial= 'hidden'
                    animate = {mainControls}
                    transition={{delay: 0.25, duration: 0.5}}
              >New Dual Scense Controllers</motion.div>
              <Link to='/Products'>
                <button
                  className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                  Shop Now
              </button>
            </Link>
            </div>
            <img src={controller} alt='banner' className=''/>
          </div>

          <div>
            <div className='relative h-[57%] rounded-sm overflow-hidden mt-3 md:mt-0'>
              <div className='absolute top-10 md:top-16 left-12 w-[70vw] md:w-[30vw]'>
                  <motion.div className='text-[30px] md:text-[45px] font-regular text-white'
                  variants={{
                        hidden:{opacity:0,y:75},
                        visible:{opacity:1,y:0},
                    }}
                    initial= 'hidden'
                    animate = {mainControls}
                    transition={{delay: 0.25, duration: 0.5}}
                  >The New Google Pixel 7</motion.div>
                  <Link to='/Products'>
                      <button
                        className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                        Shop Now
                    </button>
                    </Link>
                </div>
              <img src={pixel}/>
            </div>

            <div className='md:flex md:space-x-3 md:mt-[21px]'>
              <div className='w-full md:w-[48%] overflow-hidden rounded-sm relative  mt-3 md:mt-0'>
                  <div className='absolute top-8 left-5 w-[65%]'>
                  <motion.div className='text-[25px] font-medium text-black'
                  variants={{
                        hidden:{opacity:0,y:75},
                        visible:{opacity:1,y:0},
                    }}
                    initial= 'hidden'
                    animate = {mainControls}
                    transition={{delay: 0.25, duration: 0.5}}
                    >Hoodies to match your vibe</motion.div>
                    <Link to='/Products'>
                      <button
                        className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                        Shop Now
                    </button>
                  </Link>
                </div>
              <img src={jacket} className='w-full md:w-auto'/>
              </div>
              <div className='md:w-[49%] overflow-hidden rounded-sm relative  mt-3 md:mt-0'>
                  <div className='absolute top-8 left-5 w-[65%]'>
                  <motion.div className='text-[25px] font-medium text-white'
                  variants={{
                        hidden:{opacity:0,y:75},
                        visible:{opacity:1,y:0},
                    }}
                    initial= {mainControls}
                    animate = {mainControls}
                    transition={{delay: 0.25, duration: 0.5}}
                    >Pocketable gaming beast</motion.div >
                    <Link to='/Products'>
                      <button
                        className='bg-primary mt-4 text-xl text-regular px-12 py-2  font-semibold rounded-sm text-white duration-200 hover:bg-inherit hover:text-primary'>
                        Shop Now
                    </button>
                  </Link>
                </div>
              <img src={laptop} className='w-full md:w-auto'/>
              </div>
              
            </div>
          </div>

        </div>

        {/* Banner section no. 2 */}
        <div className='w-full relative '>
          <div ref={BannerRef} className='top-[50px] left-[50px] absolute'>
               <div className=' relative w-[80%] md:w-[40%] pb-5'>
                 <motion.div className=' text-[40px] md:text-[60px] font-inter font-regular text-white'
                variants={{
                        hidden:{opacity:0,y:75},
                        visible:{opacity:1,y:0},
                    }}
                    initial= 'hidden'
                    animate = {secondControls}
                    transition={{delay: 0.25, duration: 0.5}}
                >Discover the World with DJI enhanced Arial Photography</motion.div >
                <motion.div className={`absolute  right-0  top-0 h-full w-2 bg-white`}
                    variants={{
                        hidden:{width: '100%'},
                        visible:{width: 0},
                    }}
                    initial= 'hidden'
                    transition={{duration:0.5,ease: 'easeIn'}}
                    animate = {secondControls}
                >

                </motion.div>
               </div>
               <Link to='/Products'>
                 <button
                    className='text-2xl bg-white mt-4  px-12 py-4 border-[2px] font-semibold rounded-sm text-white border-white hover:border-none bg-transition2'>
                    Shop Now
                </button>
              </Link>
            </div>
          <div className=' '>
            <img src={DJI} className='object-right object-cover h-[75vh] md:h-auto'/>
          </div>
        </div>

        <div className='w-full my-10 relative '>
          <div className='px-[50px] md:px-0 absolute h-full items-center flex w-full justify-center text-white font-semibold text-2xl md:text-5xl'>Get Additional Discount on Debit Card</div>
          <img src={Strip} className='h-[20vh] md:h-auto'/>
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