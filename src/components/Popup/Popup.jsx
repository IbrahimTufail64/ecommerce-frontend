import React, { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../Shared/Button";
import { context } from "../../App";
import { Link } from "react-router-dom";

const Popup = ({ orderPopup, handleOrderPopup }) => {
  const {seller} = useContext(context);
  return (
    <>
      {orderPopup && (
        <div>
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="w-[300px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 rounded-xl">
              {/* Header secton */}
              <div className="flex items-center justify-between">
                <h1>Menu</h1>
                <div>
                  <IoCloseOutline
                    onClick={handleOrderPopup}
                    className="text-2xl cursor-pointer"
                  />
                </div>
              </div>

              {/* Form secton */}
              <div className="mt-4 flex flex-col  text-xl font-semibold space-y-2 p-3">
                
                <Link to={`/Products`} className=" hover:text-primary transition-all">Shop</Link>
                <Link to={`/`} className=" hover:text-primary transition-all">Home</Link>
                <Link to={`/Account`} className={`hover:text-primary transition-all ${localStorage.getItem('token') === '' && 'hidden'}`}>Profile</Link>
                <Link to={`/Login`} className={`hover:text-primary transition-all ${localStorage.getItem('token') !== '' && 'hidden'}`}>Login</Link>
                <Link to={`/orders`} className={`hover:text-primary transition-all ${localStorage.getItem('token') === '' && 'hidden'}`}>Orders</Link>
                
                <div className="flex justify-center">
                  <Button
                   handler={handleOrderPopup}
                    text="Close"
                    bgColor={"bg-primary"}
                    textColor={"text-white"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
