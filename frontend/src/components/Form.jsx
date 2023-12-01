import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PaymentInfo from "./PaymentInfo";
import AdressInfo from "./AdressInfo";
import InvoicePDF from './InvoicePDF';
import "./Form.css"
import axios, { formToJSON } from "axios";
import {useNavigate} from "react-router-dom";

function Form({cartData}) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    cardNum: "",
    expiry: "",
    cvc: "",

  });

  const FormTitles = ["Personal Info", "Payment Info", "Adress"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PaymentInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <AdressInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="form">
      <div className="progressbar">
        <div
          style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
              // updated new data 
            }}
          >
            Prev
          </button>
          <button
            disabled={!cartData} // Disable the button if the cart data is not available or still loading
            onClick={() => {
              if (page === FormTitles.length - 1) {
                var data = [];
                cartData.products.forEach(prod => {
                  var item = {
                  product: prod.productId,
                  quantity: prod.quantity,
                  price: prod.price
                }
                data.push(item);
                });

                InvoicePDF.generateInvoice(formData, cartData.products,formData.email);
                axios.post("http://localhost:8080/api/orders/", {
                  items: data,
                  status: "processing",
                  user: cartData.userId,
                  shippingAddress: {
                    fullName: formData.fullName,
                    addressLine1: formData.addressLine1,
                    addressLine2: formData.addressLine2,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.postalCode,
                    phoneNumber: formData.phoneNumber
                  },
                  totalPrice: cartData.totalPrice
                  });
                  navigate('/GetOrders/'+ cartData.userId);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit Order" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form