import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import Dropdown from '../components/Dropdown/Dropdown';
import axios from 'axios';
import Order from '../components/DashboardOrder/Order';

const Inbox = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);
    const [orderStatus, setOrderStatus] = useState('all');
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingState, setLoadingState] = useState(false);

    const fetchInbox =async ()=>{
        try{
            setLoadingState(true);
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/inbox?page=${page}&status=${orderStatus}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                console.log(res.data)
                if(page == 1){
                setOrders(()=> [...res.data.orders])
                }
                else{
                    const orderSet = new Set([... orders,...res.data.orders]);
                setOrders(()=> [...orderSet])
                }
                
            })
            .catch(err => console.log(err))
            setLoadingState(false);
        }
        catch(err){
            throw new Error(err);
        }
    }

    useEffect(()=>{
        console.log('fetching...')
        fetchInbox();
    },[page])


 const sortedOrders = [...orders].sort((a, b) => {
        // If status is 'pending', prioritize it over others
        if (a.status === 'pending' && b.status !== 'pending') {
            return -1; // a comes before b
        } else if (a.status !== 'pending' && b.status === 'pending') {
            return 1; // b comes before a
        } else {
            return 0; // Maintain the original order
        }
    
    });


  useEffect(() => {
    // Create a new array by sorting the orders
   

    // Update the state with the sorted array
    setOrders([]);
}, [orderStatus]);

    const handleScroll = ()=>{
        const Height = document.body.scrollHeight;
        const Top = document.documentElement.scrollTop;
        const Window = window.innerHeight;
        if(Top + Window + 1 >= Height && !loadingState) {
            setPage( page => page+1);
            console.log('height: ',Height, Top, Window)
        }
        
    }

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll);

        return ()=> window.removeEventListener('scroll',handleScroll);
    },[])


    const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <div className="bg-white dark:bg-black dark:text-white duration-200 overflow-hidden">
      <div className='hidden'><Navbar handleOrderPopup={handleOrderPopup} /></div>     
        {/* Sidebar  */}

<Sidebar/>

<div class="p-4 sm:ml-64 space-x-5 pt-10">
    <div className=' bg-dashboardPrimary p-6 w-full'>
        <div className='flex justify-between'>
            <div className='text-4xl font-semibold '>Orders History</div>
            <div><Dropdown setTime={setOrderStatus}  title={`Order by ${orderStatus}`} options={['all','pending','delivered','cancelled']}/></div>
        
        </div>
        <div className='flex text-2xl font-semibold justify-between m-5 mr-10'>
            <div className='w-[300px]'>Details</div>
            <div >Status</div>
            <div >Time</div>
        </div>
            <div className=' mt-5'>
            {
                orders.map(order => (
                    <div className='flex justify-between border border-slate-700 p-4'>
                        <div className='w-1/3'><Order order={order}/></div>
                        <div className={` pt-8`}>
                            <DropDownCustom order={order}/>
                        </div>
                        <div className='pt-8 text-slate-500 mr-5'>{order.time.split('T')[0]}</div>
                    </div>
                ) )
            }
        </div>
    </div>
</div>

    </div>
  )
}

export default Inbox



const DropDownCustom = ({order})=>{
    const [individualStatus, setIndividualStatus] = useState(order.status)
    const colorObj = {
        'pending': '#FF9A6C',
        'delivered': '#BAEDBD',
        'cancelled': '#ED6C6C',
    }

    const changeOrderStatus =async ()=>{
        try{
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/change-order-status/${order.order_id}?status=${individualStatus}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                console.log(res.data)
            })
        }
        catch(err){
            throw new Error(err);
        }
    }
    useEffect(()=>{
        changeOrderStatus();
    },[individualStatus])
    return (
        <div>
            <Dropdown setTime={setIndividualStatus}  title={`${individualStatus}`} textColor={colorObj[individualStatus]} color={'inherit'} options={['pending','delivered','cancelled']}/>
        </div>
    )
}