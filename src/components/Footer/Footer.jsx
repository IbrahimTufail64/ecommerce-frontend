import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className="dark:bg-gray-950 bg-slate-50">
      <div className="container">
        <div className="space-y-24 pl-6 md:pl-0 md:space-y-0 flex justify-between flex-wrap pb-20 pt-[80px]">
          {/* company details */}
          <div className="space-y-5">
            <div className="text-3xl font-semibold">Download Our App
              <div className="dark:bg-white w-[40px] h-[5px] mt-2"></div>
            </div>
            
            <div className="flex space-x-5"><FaGooglePlay size={25}/><div className="text-2xl">Google Play</div></div>
            <div className="flex space-x-5"><FaApple size={33}/><div className="text-2xl">App Store</div></div>
          </div>

          {/* Footer links */}
          <div className="space-y-5">
            <div className="text-3xl font-semibold">Follow us on
              <div className="dark:bg-white w-[40px] h-[5px] mt-2"></div>
            </div>
            
            <div className="flex space-x-5">
              <FaFacebook size={25}/>
              <FaLinkedin size={25}/>
              <FaSquareXTwitter size={25}/>
              <AiFillInstagram size={25}/>
            </div>
          </div>
          {/* Contact Us */}
          <div className="space-y-5">
            <div className="text-3xl font-semibold">Contact Us
              <div className="dark:bg-white w-[40px] h-[5px] mt-2"></div>
            </div>
            
            <div className="space-y-5">
              <div className="flex space-x-3">
                <FaPhoneAlt size={20}/>
                <div>+92 303 9111032</div>
              </div>
              <div className="flex space-x-3">
                <IoMail size={20}/>
                <div>ibrahimkhudai03@gmail.com</div>
              </div>
              <div className="flex space-x-3">
                <FaLocationDot size={20}/>
                <div>Office no. 4, Some Plaza, First Street, Some City </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
