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

  const [productData, setProductData] = useState(ProductsData)
  useEffect(() => {
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
      <div className={`container ${showRec && 'hidden'}`}>
        {/* Header section */}
        <Heading title="Products Recommendation" subtitle={"Explore Our Products"} />
        {/* Body section */}
        <ProductCard data={productData} />
        {/* <ProductCard data={ProductsData2} /> */}
      </div>
    </div>
  );
};

export default Products;
