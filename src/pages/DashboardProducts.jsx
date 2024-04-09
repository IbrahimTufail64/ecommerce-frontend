import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Modal from '../components/ConfirmModal/Modal';


const DashboardProducts = () => {
const [orderPopup, setOrderPopup] = React.useState(false);

    const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

      const [products, setProducts] = useState([]); 
      const [productColors, setProductColors] = useState([]); 
      const [page, setPage] = useState(1); 
      const [deleteProductID, setDeleteProduct] = useState(''); 
      const [ModalStates, setModalStates] = useState({
        show: false,
        title: "",
        body: "",
        confirm: false,
        cancel: false,
        button: ""
      })

     const fetchProducts =async ()=>{
        try{ 
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/products?page=${page}`,{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                console.log(res.data)
                // console.log(products)
                if(  page == 1 ){
                
                setProducts(products => {
                      return    [...res.data.products]
                    });
                setProductColors(colors => {
                    return [...res.data.colors]});
                }
                else{
                    console.log(page)
                    setProducts(products => {
                        const productSet = new Set( [...products,...res.data.products])
                        return [...productSet]
                    });
                setProductColors(colors => {
                    const ColorSet = new Set( [...colors,...res.data.colors])
                    return [...ColorSet]});
                }
            })
        }
        catch(err){
            throw new Error(err);
        }
    }

    const ConfirmDelete = (ID)=>{
        setDeleteProduct(ID);
        setModalStates(prevState => ({
        ...prevState,
        show: true,
        title: "Delete Product",
        body: "Are you sure you want to delete the selected Product? This action is irreversible.",
        button: "Confirm"
    }));
    }


     const deleteProduct =async ()=>{
        try{ 
            setModalStates(prevState => ({
        ...prevState,
        show: false,
    }));
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/delete-product/${deleteProductID}`,{ 
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res => {
                console.log(res.data);
                let newProducts = products;
                let newColors = productColors;
                newProducts.filter(product => product.id !== deleteProductID);
                newColors.filter(product => product[0].product_id !== deleteProductID);
                setProducts( newProducts)  ;
                setProductColors(newColors);
                console.log(newProducts,newColors);   
            }).catch( err => {console.log(err)});
        }
        catch(err){
            throw new Error(err);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[page])

  return (
    <div className="bg-black text-white duration-200 overflow-hidden">
      <div className='hidden'><Navbar handleOrderPopup={handleOrderPopup} /></div>     
        {/* Sidebar  */}

<Sidebar/>

<div class="p-4 sm:ml-64 space-x-5 pt-10">
    <div className=' bg-dashboardPrimary p-6 w-full'>
        <div className='flex justify-between'>
            <div className='text-4xl font-semibold '>Products Inventory</div>
            <div></div>
        
        </div>
        <div className='flex text-2xl font-semibold justify-between m-5 mr-10'>
            <div className='w-1/5'>Details</div>
            <div >Inventory</div>
            <div >Sold</div>
            <div >Edit</div>
            <div >Delete</div>
        </div>
            <div className=' mt-5  '>
                <Modal setModalStates ={setModalStates} ModalStates={ModalStates} Action={deleteProduct}/>
                {products.map((product,idx)=>{
                    let inventory = 0;
                    productColors[idx].map(color =>{
                        inventory +=color.item_count
                    })
                    return(
                        <div className='flex justify-between items-center px-4 pr-16 border border-slate-800 py-2 rounded-md'>
                            <div className='flex space-x-16'>
                                <img src={`${import.meta.env.VITE_SERVER_URL}/images/${productColors[idx][0].imageuri}`} className='w-[60px] h-[60px]  object-cover' alt="Product Image" />
                                <div className='text-xl w-[80px] font-semibold flex items-center'>{product.name}</div>
                            </div>
                             
                            <div>{inventory}</div>
                            <div className='pl-10'>{product.sold}</div>
                            <Link to={`/dashboard/products/edit/${product.id}`}><FaEdit className='text-[#F29D38] size-7'/></Link>
                            <Link to='#' onClick={()=>ConfirmDelete(product.id)}><MdAutoDelete className='text-[#EB3223] size-7'/></Link>
                        </div>
                    )
                })}
        </div>
        <div className='flex justify-center mt-10'>
            <button onClick={()=>{setPage(page=>page+1)}}
            className='px-8 py-2 text-white bg-dashboardSecondary '
        >Load More...</button>
        </div>
    </div>
</div>

    </div>
  )
}

export default DashboardProducts