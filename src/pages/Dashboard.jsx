import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './Create';
import Navbar from '../components/Navbar/Navbar';



const Dashboard = () => {

const [orderPopup, setOrderPopup] = React.useState(false);

const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar handleOrderPopup={handleOrderPopup} />     

    </div>
  )
}

export default Dashboard