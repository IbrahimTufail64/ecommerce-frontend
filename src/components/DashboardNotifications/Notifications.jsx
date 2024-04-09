import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MdExpandMore } from "react-icons/md";
import Ratings from '../Rating/Ratings';
import { context } from '../../App';

const Notifications = ({notification}) => {
    const [customer, setCustomer] = useState({profileuri: null});
    const [open, setOpen] = useState(false);
    const [reply, setReply] = useState('')
    const [remove, setRemove] = useState(false);

    const {setSuccessToggle,setFailedToggle, setPopUpContent} = useContext(context);

    const date = new Date(notification.time).toLocaleDateString(
  'en-gb',
  {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
);

    const sendReply = async()=>{
        try{
            const res =  await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/reply/${notification.id}`,{
                reply
            },{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                setPopUpContent('Reply Updated!');
            setSuccessToggle(true);
            setRemove(true);
            }).
            catch(e=> {
            setPopUpContent(err.response.data.message);
          setFailedToggle(true); 
          setOpen(false);
            console.log(e)})
                
            
        }
        catch(err){
            setPopUpContent('Sorry! An Error occured while sending reply!');
          setFailedToggle(true);
          setOpen(false);
            throw new Error(err);
        }
    }


        const dismissComment = async()=>{
        try{
            const res =  await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/dismiss-review/${notification.id}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                setPopUpContent('Dismissed!');
            setSuccessToggle(true);
            setRemove(true);
            }).
            catch(e=> {
            setPopUpContent(err.response.data.message);
          setFailedToggle(true); 
          setOpen(false);
            console.log(e)})
                
            
        }
        catch(err){
            setPopUpContent('Sorry! An Error occured while sending reply!');
          setFailedToggle(true);
          setOpen(false);
            throw new Error(err);
        }
    }

    const fetchCustomer = async()=>{ 
    try{ 
        const res =  await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/customer/${notification.customerId}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }) 
        setCustomer(res.data.customer)
        console.log(res.data)

    }
    catch(err){
        throw new Error(err);
    }
}
    useEffect(()=>{
        fetchCustomer();
    },[])
  return (
    <div className={`bg-[#111111] py-5 px-5 rounded-xl space-y-3 ${remove && 'hidden'}`}>
        <div className=' flex space-x-2 '>
            <img className='w-[45px] h-[40px] bg-inherit object-cover rounded-full overflow-hidden ' src={customer.profileuri ? `${import.meta.env.VITE_SERVER_URL}/images/${customer.profileuri}` : 'https://i.pinimg.com/564x/39/94/fb/3994fb52d1f983d003ed6f084366bdab.jpg'} alt='Profile image'/> 
        <div className='flex justify-between w-full'>
           <div className={`max-w-[200px] ${!open && 'max-h-[100px] overflow-hidden'}`}>
             <div className='font-semibold text-white'>@{customer.name}</div>
             <div className='text-sm font-light text-slate-600'>{notification.comment}</div>
           </div>
            <div className='text-sm font-light text-white w-1/3'>{date}</div>
        </div>
    </div>
    <div className={`${!open && 'hidden'} pl-10`}>
        <Ratings stars={notification.review}/>
        <div className={`${!notification.comment && 'hidden'}`}>
            <textarea required className=" appearance-none h-[150px] my-5 relative block md:w-full px-3 py-2 border-2 resize-none text-white border-gray-400 bg-inherit focus:outline-none max-w-[300px] focus:z-10 sm:text-sm"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            />
        </div>

            <div className='space-x-2'>
                <button
                hidden={!notification.comment}
                onClick={()=>sendReply()}
                className='bg-primary mt-4 px-5 text-sm py-2 border-[1px] font-semibold rounded-sm text-primary border-primary bg-transition'>
                Reply
            </button>
            <button
                onClick={()=>dismissComment()}
                className='bg-primary mt-4 px-5 text-sm py-2 font-semibold  hover:text-primary hover:transition-all hover:bg-white rounded-sm text-white'>
                Dismiss
            </button>
            </div>
    </div>
    <div className=' flex justify-center' ><MdExpandMore className={`size-7 cursor-pointer text-slate-400 hover:text-white transition-all ${open && 'rotate-180'}`} onClick={()=> setOpen(!open)} /></div> 
    </div>
  )
}

export default Notifications