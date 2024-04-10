import React, { createContext, useState } from "react";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products.jsx";
import LoginForm from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProductPageCopy from "./pages/ProductPageCopy.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import Success from "./pages/Success.jsx";
import Failure from "./pages/Failure.jsx";
import Orders from "./pages/Orders.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Create from "./pages/Create.jsx";
import Review from "./pages/Review.jsx";
import Inbox from "./pages/Inbox.jsx";
import DashboardProducts from "./pages/DashboardProducts.jsx";
import Modal from "./components/ConfirmModal/Modal.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import DashboardCustomers from "./pages/DashboardCustomers.jsx";
import Success_popup from "./components/PopUp_Messages/Success_popup.jsx";
import Fail_popup from "./components/PopUp_Messages/Fail_popup.jsx";
import Popup from "./components/Popup/Popup.jsx";

export const context = createContext();

const App = () => {
  const [orderinfo,setOrderinfo] = useState([]);
  const [seller,setSeller] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [rating, setRatings] = useState({});
  // Pop up states
  const [successToggle, setSuccessToggle] = useState(false);
    const [failedToggle, setFailedToggle] = useState(false);
    const [popUpContent, setPopUpContent] = useState('');

    const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <main className="relative">
      <context.Provider value={{orderinfo,setOrderinfo,seller,setSeller,orderPopup,setOrderPopup,rating,setRatings,setSuccessToggle,setFailedToggle,setPopUpContent}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/Products" element={<Products />}></Route>
        <Route path="/Product-page/:id" element={<ProductPageCopy />}></Route>
        <Route path="/Login" element={<LoginForm />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Account" element={<AccountPage />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/failure" element={<Failure />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/review-product" element={<Review />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/create" element={<Create />}></Route>
        <Route path="/dashboard/inbox" element={<Inbox />}></Route>
        <Route path="/dashboard/products" element={<DashboardProducts />}></Route>
        <Route path="/dashboard/customers" element={<DashboardCustomers />}></Route>
        <Route path="/dashboard/products/edit/:id" element={<EditProduct />}></Route>
      </Routes>
    </BrowserRouter>
        <Fail_popup openWindow={failedToggle} setOpenWindow={setFailedToggle} content={popUpContent}/>
    <Success_popup openWindow={successToggle} setOpenWindow={setSuccessToggle} content={popUpContent}/>
    <Popup orderPopup={orderPopup} handleOrderPopup={handleOrderPopup} />
    </context.Provider>
    </main>
  );
};

export default App;
