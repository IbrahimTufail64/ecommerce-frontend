import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import './dashboard.css'
import LineChart from '../components/LineChart/lineChart';
import { BarGraph } from '../components/BarChart/BarChart';
import { MyResponsivePie } from '../components/PieChart/PieChart';
import Sidebar from '../components/SideBar/Sidebar';
import axios from 'axios';
const data = [
  {
    "id": "make",
    "label": "make",
    "value": 243,
    "color": "hsl(9, 70%, 50%)"
  },
  {
    "id": "go",
    "label": "go",
    "value": 564,
    "color": "hsl(300, 70%, 50%)"
  },
  {
    "id": "java",
    "label": "java",
    "value": 40,
    "color": "hsl(40, 70%, 50%)"
  },
  {
    "id": "javascript",
    "label": "javascript",
    "value": 99,
    "color": "hsl(300, 70%, 50%)"
  },
  {
    "id": "python",
    "label": "python",
    "value": 11,
    "color": "hsl(8, 70%, 50%)"
  }
]

const Dashboard = () => {

const [orderPopup, setOrderPopup] = React.useState(false);
const [analytics, setAnlytics] = useState({
  Revenue: 0,
  views: 0,
  NoOfOrders: 0
});

const fetchAnalytics = async()=>{
   await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/analytics?Time=${'day'}`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
   })
   .then( res => {
      let Revenue =0, views=0, NoOfOrders=0;
      res.data.map(a =>{
        Revenue+= a.Revenue;
        views+= a.views;
        NoOfOrders+= a.orders && a.orders.length;
      });
      const data = {Revenue,views, NoOfOrders}
      console.log(data);
        setAnlytics(data);
       console.log(res.data);
     })
  
 .catch(e=> console.log(e.data))
}

useEffect(()=>{
    fetchAnalytics();
},[])

const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };




  return (
    <div className="bg-white dark:bg-black dark:text-white duration-200 overflow-hidden">
      <div className='hidden'><Navbar handleOrderPopup={handleOrderPopup} /></div>     
        {/* Sidebar  */}
        
{/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button> */}

<Sidebar/>

<div class="p-4 sm:ml-64">
   <div class="p-4">
      <div className='flex flex-wrap lg:space-x-4 space-y-4 lg:space-y-0'>
        <div className='h-[120px] bg-dashboardPrimary w-[300px] rounded-xl p-4 '>
          <div className='text-xl font-light'>Views</div>
          <div className='flex  justify-between mt-4'>
            <div className='text-3xl font-semibold'>{analytics.views}</div>
            <div className='text-xm text-gray-500 mt-4'>13.07% increase</div>
          </div>
        </div>
        <div className='h-[120px] bg-dashboardPrimary w-[300px] rounded-xl p-4'>
          <div className='text-xl font-light'>Revenue</div>
          <div className='flex  justify-between mt-4'>
            <div className='text-3xl font-semibold'>${analytics.Revenue}</div>
            <div className='text-xm text-gray-500 mt-4'>13.07% increase</div>
          </div>
        </div>
        <div className='h-[120px] bg-dashboardPrimary w-[300px] rounded-xl p-4'>
          <div className='text-xl font-light'>No. of Orders</div>
          <div className='flex  justify-between mt-4'>
            <div className='text-3xl font-semibold'>{analytics.NoOfOrders}</div>
            <div className='text-xm text-gray-500 mt-4'>13.07% increase</div>
          </div>
        </div>
      </div>
   </div>
   <div className='h-[200px] lg:h-[500px] bg-dashboardPrimary mx-4 lg:p-4 p-1 rounded-xl'>
    <LineChart/>
   </div>
   <div className=' lg:h-[300px]  lg:p-4 p-1 rounded-xl md:flex overflow-fidden'>
    <div className='md:w-1/2 bg-dashboardPrimary rounded-xl'><BarGraph/></div>
    <div className='ml-2 md:w-1/2 bg-dashboardPrimary rounded-xl'><MyResponsivePie data={data}/></div>
   </div>
</div>
{/* sidebar end   */}
    </div>
  )
}

export default Dashboard