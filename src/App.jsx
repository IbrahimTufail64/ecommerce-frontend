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

export const context = createContext();

const App = () => {
  const [orderinfo,setOrderinfo] = useState([]);
  const [seller,setSeller] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);

  return (
    <main>
      <context.Provider value={{orderinfo,setOrderinfo,seller,setSeller,orderPopup,setOrderPopup}}>
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
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/create" element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
    </context.Provider>
    </main>
  );
};

export default App;
