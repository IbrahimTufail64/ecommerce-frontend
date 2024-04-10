import React, { useContext, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import { Fade as Hamburger } from 'hamburger-react'
import axios from "axios";



export const verifyUser = async(setSeller)=>{
  // const {setSeller} = useContext(context);
      try{
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/verify-user`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then( e => setSeller(e.data.Role))
        .catch(e=> {
          emptyCredentials();
          console.log(e.data)})
      }
      catch(err){
        emptyCredentials();
        throw new Error(err);}
}

const emptyCredentials = ()=>{
  localStorage.setItem('Email','');
        localStorage.setItem('token','');
        localStorage.setItem('Address','');
        localStorage.setItem('UserName','');
}

const Navbar = ({ handleOrderPopup }) => {
  const {seller,setSeller,orderPopup, setOrderPopup} = useContext(context);
  useEffect(()=>{
    verifyUser(setSeller);
    console.log(seller)
  })
const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Shop",
    link: "/Products",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Account",
    link: "/Account",
  },
  {
    id: 2,
    name: "Cart",
    link: "/Account",
  },
  {
    id: 3,
    name: "Orders",
    link: "/orders",
  },
  {
    id: 4,
    name: `${seller? 'Dashboard': 'Login'} `,
    link: `/${seller? 'dashboard': 'Login'}`,
  },
];
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links section */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
            >
              Eshop
            </a>
            <a
              onClick={()=>{navigate('/Login')}}
              className={`${localStorage.getItem('Email') ? 'hidden': ' px-4'} md:inline-block hidden cursor-pointer font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200`}
            >
              Login
            </a>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      onClick={()=>{navigate(data.link)}}
                      className="inline-block cursor-pointer px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {" "}
                      {data.name}
                    </a>
                  </li>
                ))}
                {/* Dropdown  */}
                <li className={`relative cursor-pointer group ${!localStorage.getItem("Email")&& 'hidden'}`}>
                  <a
                    href="/Account"
                    className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                  >
                    Profile
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>

                  {/* Dropdown Links */}
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white ">
                    <ul className="space-y-2">
                      {DropdownLinks.map((data, index) => (
                        <li>
                          <a
                            className="text-gray-500 cursor-pointer dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                            onClick={()=>{navigate(data.link)}}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4">
            

            {/* Order-button section */}
            <button className={`relative p-3 ${!localStorage.getItem("Email")&& 'hidden'}`} onClick={()=>{handleOrderPopup; navigate('/Account')}}>
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                {localStorage.getItem('CartSize') ? localStorage.getItem('CartSize'): 0}
              </div>
            </button>
            
            {/* Dark Mode section */}
            <div>
              <DarkMode />
            </div>
            {/* HamburgerMenu */}
            <div className="md:hidden">
              <Hamburger size='20' toggled={orderPopup} toggle={setOrderPopup} color="#f42c37" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center
