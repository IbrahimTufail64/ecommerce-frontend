import React, { useState } from 'react'
import { useTimer } from 'react-timer-hook';

import Watch from '../../assets/watch.png' 

const Timer = () => {

    const [timer, setTimer] = useState([2,10,30,59]);
    
    const expiryTimestamp = Date.now() + 1000 * 60 * 60 * 24 * 7;

     const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div className='w-full md:flex bg-[#F3F6FB] justify-between relative md:h-[65vh] p-[25px] mb-[120px]'>
          <div className='md:w-[30%] mt-[70px] ml-[30px] mb-10 md:mb-0'>
            <div className='text-5xl md:text-[65px] text-black font-semibold'>Limited Weekly Discount</div>
            <div className='text-black text-xl opacity-70 '>Claim your favorite products on unbelievable prices</div>
          </div>
          <div className='absolute flex w-full justify-center '><img className='md:w-[35%] md:pr-16' src={Watch}/></div>
          <div className='md:w-1/3 pt-10 md:pl-16  mt-[400px] md:mt-0'>
            <div className='text-[35px] text-black font-semibold'>Ends in</div>
            <div className='flex space-x-2 my-4'>
              <div className='w-[100px] border-2 h-[100px] rounded-lg relative'>
                <div className='absolute text-black opacity-50 font-medium top-2 w-full flex justify-center'>Days</div>
                <div className='flex justify-center text-[50px] text-black font-light mt-6'>{days}</div>
              </div>
              <div className='w-[100px] border-2 h-[100px] rounded-lg relative'>
                <div className='absolute text-black opacity-50 font-medium top-2 w-full flex justify-center'>Hours</div>
                <div className='flex justify-center text-[50px] text-black font-light mt-6'>{hours}</div>
              </div>
              <div className='w-[100px] border-2 h-[100px] rounded-lg relative'>
                <div className='absolute text-black opacity-50 font-medium top-2 w-full flex justify-center'>Minutes</div>
                <div className='flex justify-center text-[50px] text-black font-light mt-6'>{minutes}</div>
              </div>
              <div className='w-[100px] border-2 h-[100px] rounded-lg relative'>
                <div className='absolute text-black opacity-50 font-medium top-2 w-full flex justify-center'>Seconds</div>
                <div className='flex justify-center text-[50px] text-black font-light mt-6'>{seconds}</div>
              </div>
            </div>
            <div className='text-[20px] text-black font-bold'>Discount on Tablets, Laptops, earbuds & more</div>
            
          </div>
        </div>
  )
}

export default Timer