import React from 'react'

import slide1 from '../../assets/slide1.png'

const Slide1 = ({image=slide1,content}) => {
  return (
    <div className={`bg-gradient-to-r from-[#161F32] to-[#1B2740] w-full flex-col-reverse md:flex-row flex justify-between md:px-5 md:h-[70vh] h-[110vh] `}>
        <div className='md:1/3 mb-24 md:mb-0'>
            <div className='pt-[100px]  md:ml-[80px] ml-12'>
                <div className=' w-[300px] text-[50px] md:text-[60px] font-inter font-regular text-white'>{content}</div>
                <div className='bg-white w-[60px] h-[6px] mb-10'></div>
                 <button
                    className='text-2xl bg-white mt-4  px-12 py-4 border-[2px] font-semibold rounded-sm text-white border-white hover:border-none bg-transition2'>
                    Shop Now
                </button>
            </div>
        </div>
        <div className= 'w-full md:w-2/3 ' >
            <img src={image} />
        </div>
    </div>
  )
}

export default Slide1