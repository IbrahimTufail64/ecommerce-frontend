import React from "react";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products.jsx";
import LoginForm from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProductPageCopy from "./pages/ProductPageCopy.jsx";
import AccountPage from "./pages/AccountPage.jsx";

const App = () => {

  return (
    <main>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/Products" element={<Products />}></Route>
        <Route path="/Product-page/:id" element={<ProductPageCopy />}></Route>
        <Route path="/Login" element={<LoginForm />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Account" element={<AccountPage />}></Route>
      </Routes>
    </BrowserRouter>
    </main>
  );
};

export default App;
