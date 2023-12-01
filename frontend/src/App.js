import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //in router v6 swtich is routes
import Home from "./components/pages/Home";
import Productlisting from "./components/pages/Productlisting";
import Productlisting2 from "./components/pages/Productlistingcomment";
import LoginRegister from "./components/LoginRegister";
import ProductsDetail from "./components/pages/ProductsDetail";
import ReviewSubmit  from "./components/pages/ReviewSubmit";
import LoginwFooter from "./components/pages/LoginwFooter";
import ProductSearch from "./components/pages/Search";
import Checkout from "./components/checkout/Checkout";
import Cart from "./components/cart/Cart";
import Orders from "./components/pages/OrderListing";
import Sort from "./components/pages/Sort";
import Category from "./components/pages/Category";
import Wishlist from "./components/pages/Wishlist";
import AdminLogin from "./components/AdminLogin";
import ProdMan from "./components/ProdMan";
import RevenueChart from "./components/pages/RevenueChart";
import InvoicesForSM from "./components/pages/InvoicesForSM";
import ManageProducts from "./components/ManageProducts";
import ManageCategories from "./components/ManageCategories";
import DetermineStocks from "./components/DetermineStocks"
import OrderDetails from "./components/OrderDetails";
import PriceSetListing from "./components/pages/PriceSetListing2";
import SetDiscount from "./components/pages/SetDiscount";
import RefundReqsSM from "./components/pages/RefundRequestsSM";
import ProductsDetail2 from "./components/pages/ProductsDetailComment";
import ProfitChart from "./components/salesMan";
import SalesMan from "./components/pages/SalesManNav";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Products" element={<Productlisting/>} />
          <Route path="/Products2" element={<Productlisting2/>} />
          <Route path="/Prods" element={<Productlisting/>} />
          <Route path ="/Register" element={<LoginwFooter/>} />
          <Route path="/products/:id" element={<ProductsDetail/>} />
          <Route path="/products2/:id" element={<ProductsDetail2/>} />
          <Route path="/register" element={<LoginwFooter/>} />
          <Route path="/login" element={<LoginwFooter/>} />
          <Route path="/ReviewSubmit/:id" element={<ReviewSubmit/>} />
          <Route path="/GetOrders/:id" element={<Orders/>} />
	        <Route path="/search/:id" element={<ProductSearch/>} />
          <Route path="/checkout" exact element={<Checkout/>}></Route>
          <Route path="/CheckoutPage" exact element={<Cart/>}></Route>
          <Route path="/sort/:id" element={<Sort/>} />
          <Route path="/category/:id" element={<Category/>} />
          <Route path="/wishlist/:id" element={<Wishlist/>} />
          <Route path="/AdminLogin" element={<AdminLogin/>} />
          <Route path="/prodMan" element={<ProdMan/>} />
          <Route path="/profitChart" element={<ProfitChart/>} />
          <Route path="/revenue/:date1/:date2" element={<RevenueChart/>} />
          <Route path="/InvoicesSM" element={<InvoicesForSM/>} />
          <Route path="/RefundReqSM" element={<RefundReqsSM/>} />
          <Route path="/ManageProds" element={<ManageProducts/>}></Route>
          <Route path="/ManageCategories" element={<ManageCategories/>}></Route>
          <Route path="/Determinestocks" element={<DetermineStocks/>}></Route>
          <Route path="/Orderdetails" element={<OrderDetails/>}></Route>
          <Route path="/SetPrice" element={<PriceSetListing/>} />
          <Route path="/SetDiscount" element={<SetDiscount/>} />
          <Route path="/salesMan" element={<SalesMan/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
