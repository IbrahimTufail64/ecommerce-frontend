import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";


const Success_popup = ({openWindow, setOpenWindow,content}) => {


  return (
    <div className={`${!openWindow && 'hidden'} fixed w-[300px]  rounded-lg drop-shadow-4xl backdrop:blur-sm left-[500px] top-[300px] bg-white text-black `}>
        <div className='bg-[#33BA87] h-[100px] rounded-t-lg flex justify-center pt-5'>
            <FaCheckCircle className='size-9 text-white' />
        </div>
        <div className='flex justify-center pt-5 text-xl px-9 pb-0 text-center'>{content}</div>
        <button className='bg-[#33BA87] px-8 text-white drop-shadow-lg py-2 my-5 flex justify-center rounded-md mt-4 ml-[85px]' onClick={()=> setOpenWindow(false)}>Confirm!</button>
    </div>
  )
}

export default Success_popup