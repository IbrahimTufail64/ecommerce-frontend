import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

// images import
import Img1 from "../../assets/product/p-1.jpg";
import Img2 from "../../assets/product/p-2.jpg";
import Img3 from "../../assets/product/p-3.jpg";
import Img4 from "../../assets/product/p-4.jpg";
import Img5 from "../../assets/product/p-5.jpg";
import Img6 from "../../assets/product/p-9.jpg";
import Img7 from "../../assets/product/p-7.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loader/Loading";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Boat Headphone",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Rocky Mountain",
    price: "420",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    price: "320",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed ",
    price: "220",
    aosDelay: "600",
  },
];
const ProductsData2 = [
  {
    id: 1,
    img: Img5,
    title: "Boat Headphone",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img6,
    title: "Rocky Mountain",
    price: "420",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img7,
    title: "Goggles",
    price: "320",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img5,
    title: "Printed ",
    price: "220",
    aosDelay: "600",
  },
];
const Products = () => {
  const [showRec, setShowRec] = useState(true); 

  const [productData, setProductData] = useState([])
  useEffect(() => {
    if(localStorage.getItem('token')=== '' || !localStorage.getItem('token')){setShowRec(false);}
        const fetchData = async () => {
            try {
                
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/app/user-recommendation`,{
                  headers:{
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                }).catch(err => {setShowRec(false);})
                let products = [];
                res.data.products.map((product,idx) => products.push({
                  id: product.id,
                  title: product.name,
                  price: product.price,
                  img: `${import.meta.env.VITE_SERVER_URL}/images/${res.data.colors[idx].imageuri}`
                }))
                console.log(res.data)
                setProductData(products);
                // setResponse(res.data.products);
                // setColors(res.data.colors);
                console.log(res.data);
            } catch (err) {
              setShowRec(false);
                console.error(err);
            }
        };

        fetchData();
}, []); 
  return (
    <div>
      <div className={`container ${!showRec && 'hidden'}`}>
        {/* Header section */}
        {/* <Heading title="Products Recommendation" subtitle={"Explore Our Products"} /> */}
        <div className=' items-center flex w-full justify-center  font-regular text-4xl md:text-6xl'>Latest Arrival</div>
          <div className=' items-center flex w-full justify-center opacity-50 text-md mt-2 mb-16'>Discover Our vast catalog of products</div>
        {/* Body section */}
        {productData.length !== 0?
        <div className="space-y-5 md:space-y-0 md:grid grid-cols-3 gap-6 mb-[50px]">
           {productData.map(e=>
              (<Link to={`/Product-page/${e.id}`} className="bg-[#1F2C4A] flex-col flex overflow-hidden rounded-md h-[350px]" key={e.id}>
                  <div className="flex-1 overflow-hidden flex justify-center items-center">
                     <img src={e.img} className=' object-cover' alt="Product Image" />
                  </div>
                  <div className="px-[20px] py-[40px] pt-8"> 
                    <div className="text-3xl font-semibold text-white">{e.title}</div>
                    <div className="text-xl mt-3 opacity-50 font-semibold text-white">${e.price}</div>
                  </div>
              </Link>)
          )}
          </div>
          : <Loading/>}
        {/* <ProductCard data={productData} /> */}
        {/* <ProductCard data={ProductsData2} /> */}
      </div>
    </div>
  );
};

export default Products;


