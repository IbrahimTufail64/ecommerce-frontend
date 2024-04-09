import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import Dropdown from '../components/Dropdown/Dropdown';
import axios from 'axios';
import Notifications from '../components/DashboardNotifications/Notifications';

const DashboardCustomers = () => {
const [orderPopup, setOrderPopup] = React.useState(false);
const [customers, setCustomers] = useState([]);
const [notifications, setNotifications] = useState([]);
const [page, setPage] = useState(1);

    const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

const fetchCustomers = async()=>{ 
    try{
        const res =  await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/customers?page=${page}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }) 
        console.log(res.data)

        if(page == 1){
            setCustomers([...res.data.customers])
        }
        else{
            
            setCustomers( cus => [...cus,...res.data.customers])
        }
        
        setNotifications(res.data.notifications);
    }
    catch(err){
        throw new Error(err);
    }
}

useEffect(() => {
    fetchCustomers();
}, [page])

  return (
     <div className="bg-black text-white duration-200 overflow-hidden">
      <div className='hidden'><Navbar handleOrderPopup={handleOrderPopup} /></div>     
        {/* Sidebar  */}

<Sidebar/>

<div class="p-4 sm:ml-64 space-x-5 pt-10 flex">
    <div className=' bg-dashboardPrimary p-6 w-3/5 rounded-md'>
        <div className='text-3xl font-semibold mb-5'>Customers Detail</div>
        <div className='space-y-5'>
            <div className='flex justify-between px-5'>
                <div className='text-xl font-semibold '>Profile</div>
                <div className='text-xl font-semibold'>Address</div>
                <div className='text-xl font-semibold w-32'>Email</div>
                
            </div>
            {
                customers.map(customer => (
                    <div className='flex justify-between items-center border border-slate-800 p-4 rounded-md'>
                        <div className='w-[60px] h-[60px] object-cover rounded-full overflow-hidden '><img src={customer.profileuri ? `${import.meta.env.VITE_SERVER_URL}/images/${customer.profileuri}` : 'https://i.pinimg.com/564x/39/94/fb/3994fb52d1f983d003ed6f084366bdab.jpg'} alt='Profile image'/> </div>
                        <div className=' text-left'>{customer.name}</div>
                        <div className='w-[150px] text-slate-400 text-sm text-left'>{customer.address}</div>
                        <div>{customer.email}</div>
                    </div>
                ))
            }
        </div>
        <div className='flex justify-between mt-5 pl-[250px]'>
            <button className='bg-dashboardSecondary rounded-md hover:opacity-90 px-8 py-2' onClick={()=>setPage(page => page+1)}>Load More...</button>
        </div>
    </div>
    <div className=' bg-dashboardPrimary p-6 w-2/5 rounded-md'>
         <div className='text-3xl font-semibold mb-5'>Notifications</div>
         <div className='space-y-3'>
            {notifications.map( n => (
                <Notifications notification={n}/>
            ))}
         </div>
    </div>
</div>

    </div>
  )
}

export default DashboardCustomers