import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import { BarGraph } from '../components/BarChart/BarChart';
import { MyResponsivePie } from '../components/PieChart/PieChart';
import Sidebar from '../components/SideBar/Sidebar';
import axios from 'axios';
import LineChart from '../components/LineChart/LineChart';
import Dropdown from '../components/Dropdown/Dropdown';



const Dashboard = () => {


const [orderPopup, setOrderPopup] = React.useState(false);
const [analytics, setAnlytics] = useState({
  Revenue: 0,
  views: 0,
  NoOfOrders: 0
});

const [pieData,setPieChart] = useState([]);
const [barData,setBarChart] = useState([]);
const [lineData,setLineChart] = useState([]);
const [analyzeLineChart,setAnalyzeLine] = useState('Revenue');
const [time,setTime] = useState('week');


const fetchAnalytics = async()=>{
   await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/analytics?Time=${time}`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
   })
   .then( res => {
      let Revenue =0, views=0, NoOfOrders=0;
      let barChart = [];
      let LineChart = [{
              "id": analyzeLineChart,
              "color": "hsl(21, 70%, 50%)",
              "data": [
                
              ]
            },
          ]
      res.data.analytics.map(a =>{
        const date = a.time.split('T')[0];
        
        if(analyzeLineChart == 'Revenue'){
          LineChart[0].data.push({
                   "x": date,
                  "y": a.Revenue 
        })
        }
        else if(analyzeLineChart == 'sales'){
          LineChart[0].data.push({
                   "x": date,
                  "y": a.sales 
        })
        }
        else {
          LineChart[0].data.push({
                   "x": date,
                  "y": a.orders.length 
        })
        }
        barChart.push({
           "date": date,
            "views": a.views,
            "hot dogColor": "hsl(337, 70%, 50%)",  
        })
        Revenue+= a.Revenue;
        views+= a.views;
        NoOfOrders+= a.orders && a.orders.length;
      });
      setBarChart(barChart)
      console.log(LineChart)
      setLineChart(LineChart)
      const data = {Revenue,views, NoOfOrders}
      console.log(data);
        setAnlytics(data);
        setPieChart(res.data.PieChart);
        
       console.log(res.data);
     })
  
 .catch(e=> console.log(e.data))
}

useEffect(()=>{
    fetchAnalytics();  
},[time,analyzeLineChart])

const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };


console.log(barData);
console.log(lineData);

  return (
    <div className="bg-black text-white duration-200 overflow-hidden">
      <div className='hidden'><Navbar handleOrderPopup={handleOrderPopup} /></div>     
        {/* Sidebar  */}

<Sidebar/>

<div class="p-4 sm:ml-64">
   <div class="p-4">
    <div className='flex justify-between  py-5'>
      <div className='text-4xl font-bold '>Overview</div>
      <div className='pr-[180px] '><Dropdown setTime={setTime}  title={`Analyze by ${time}`} options={['day','week','month']}/></div>
    </div>


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
   <div className='h-[200px] lg:h-[500px] bg-dashboardPrimary mx-4 lg:p-4 p-1 rounded-xl  relative'>
    <div className='absolute px-10 pt-5 flex justify-between w-full'>
      <div className='font-semibold text-2xl '>{analyzeLineChart} by {time}</div>
      <div><Dropdown setTime={setAnalyzeLine}  title={`Graph ${analyzeLineChart}`} options={['Revenue','sales','No of Orders']}/></div>
    </div>
      <div className='mt-10 h-[350px] w-full'><LineChart data={lineData}/></div>
   
   </div>

   <div className=' lg:h-[430px]  lg:p-4 p-1 rounded-xl md:flex overflow-fidden'>
    <div className='md:w-1/2 bg-dashboardPrimary rounded-xl relative'>
      <div className='font-semibold text-2xl px-10 pt-5 absolute'>views by {time}</div>
      <div className='mt-10 h-[350px] w-full'><BarGraph data={barData}/></div>
      </div>

    <div className='ml-2 md:w-1/2 bg-dashboardPrimary rounded-xl relative '>
      <div className='font-semibold text-2xl px-10 pt-5 absolute'>Best Selling Products</div>
      <div className='mt-10 h-[350px] w-full'><MyResponsivePie data={pieData}/></div>
      {/* <div>
        <div className='font-semibold text-2xl px-10 py-3'>Best Selling Products</div>
        <div><MyResponsivePie data={pieData}/></div>
      </div> */}
    </div>
   </div>
</div>
{/* sidebar end   */}
    </div>
  )
}

export default Dashboard