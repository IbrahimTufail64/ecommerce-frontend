import React from 'react'
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Modal = ({ModalStates, setModalStates,Action}) => {
    console.log(ModalStates)
    const onClose = ()=>{
        setModalStates(prevState => ({
        ...prevState,
        show: false,
    }));
    console.log(ModalStates)
    }

    
    
  return (
    <div className={`w-[400px] pb-10 rounded-lg  fixed top-[30%] left-[40%] opacity-90 bg-white ${!ModalStates.show && 'hidden'}`}>
        <div className='flex justify-end mt-5 px-5 w-full ' >
                <Link onClick={()=>{onClose()}}>
                    <IoClose className='text-dashboardPrimary size-6'/>
                </Link>
            </div>
        <div className='flex justify-center mx-[60px]'>
            <div >
            <div className='text-dashboardPrimary text-4xl font-semibold mt-5 text-center'>{ModalStates.title}</div>
        <div className='text-slate-800 mt-2 text-xl flex justify-center text-center'>{ModalStates.body}</div>
        <div className='flex justify-center mt-5'>
            <button onClick={()=>{Action()}}
            className='px-8 py-2 rounded-full text-white bg-dashboardSecondary hover:opacity-80'
        >{ModalStates.button}</button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Modal