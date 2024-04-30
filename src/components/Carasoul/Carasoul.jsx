import React, { useState } from 'react'
// import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Carasoul = ({slides}) => {
    const [slideNo, setSlideNo] = useState(0);

    const prev = () =>{
        setSlideNo(slideNo => slideNo === 0 ? slides.length-1 : slideNo-1);
        console.log(slideNo);
    }

    const next = () =>{
        setSlideNo(slideNo => slideNo === slides.length-1 ? 0 : slideNo+1);
        console.log(slideNo);
    }

  return (
    <div className='overflow-hidden relative'>
        {/* <div className='flex w-[1000000px] transition-transform translate-x-96 ease-out duration-300'
        style={{transform: `translateX(-${slideNo*100})`}}>
            {slides.map(a=>(
                <div className='w-[100vw]'>{a}</div>
            ))}
        </div>
        <div className='absolute top-0 flex justify-between p-5 w-[99vw] items-center h-full'>
            <IoIosArrowBack size={50} className='cursor-pointer ' onClick={()=>prev()}/>
            <IoIosArrowForward size={50} className='cursor-pointer' onClick={()=>next()}/>
        </div> */}
        <Carousel autoPlay emulateTouch infiniteLoop showStatus={false}>
            {slides.map(a=>(
                <div className='w-[100vw] text-left'>{a}</div>
            ))}
            </Carousel>

    </div>
  )
}

export default Carasoul