
import { useEffect, useRef, useState } from 'react'
import slide1 from '../../assets/slide1.png'
import {  motion, useAnimation, useInView } from 'framer-motion'
import { Link } from 'react-router-dom';

const Slide1 = ({image=slide1,content}) => {

    const ref = useRef(null);
    const isInView = useInView(ref);
    const mainControls = useAnimation();
    const slideControls = useAnimation();
    const [slideHeight, setSlideHeight] =useState(false);
    useEffect(()=>{
        if(content.length > 35) setSlideHeight(true);
        mainControls.start('visible')
        slideControls.start('visible')
        console.log(slideHeight)
    },[isInView]);

  return (
    <div ref={ref} key={content}  className={`bg-gradient-to-r from-[#F3F6FB] to-[#CBD5EA] dark:from-[#161F32] dark:to-[#1B2740] relative w-full  md:flex-row md:flex justify-between md:px-5 md:h-[90vh] h-[70vh] `}>
        <div className='md:1/3 mb-24 md:mb-0 absolute md:relative top-[0px]'>
            <div className='pt-[100px]  md:ml-[80px] ml-12 relative'>
                <motion.div 
                    variants={{
                        hidden:{opacity:0,y:75},
                        visible:{opacity:1,y:0},
                    }}
                    initial= 'hidden'
                    animate = {mainControls}
                    transition={{delay: 0.25, duration: 0.5}}
                className=' w-[300px] text-[50px] md:text-[60px] font-inter font-regular '>{content}</motion.div>
                <motion.div className={`absolute  right-0 ${slideHeight ? 'h-[350px] top-[20%]': 'h-[250px] top-[25%]'} dark:bg-white bg-black`}
                    variants={{
                        hidden:{width: '100%'},
                        visible:{width: 0},
                    }}
                    initial= 'hidden'
                    transition={{duration:0.5,ease: 'easeIn'}}
                    animate = {slideControls}
                >

                </motion.div>
                <div className='dark:bg-white bg-black w-[60px] h-[6px] mb-10'></div>
                 <Link to='/Products'>
                    <button
                    className='text-2xl dark:bg-white bg-black mt-4  px-12 py-4 border-[2px] font-semibold rounded-sm  dark:border-white hover:border-none bg-transition2'>
                    Shop Now
                    </button>
                 </Link>
            </div>
        </div>
        <motion.div className= {`w-[150vw] md:w-2/3 `} 
            variants={{
                hidden:{scale:0},
                visible:{scale:1},
            }}
            transition={{duration: 0.5}}
            initial= 'hidden'
            animate = 'visible'
        >
            <img src={image} />
        </motion.div>
    </div>
  )
}

export default Slide1