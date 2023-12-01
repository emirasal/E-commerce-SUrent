import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import { useParams } from "react-router-dom";

function Orders() {
  const {id} = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [prods, setProds] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/getAll")
      .then((res) => setProds(res.data));
  }, []);

  console.log(prods)
  useEffect(() => {
    if (!id){
        return;
    }
    axios
      .get("http://localhost:8080/api/orders/getOrders/"+id)
      .then((res) => setOrders(res.data));
  }, [id]);


  useEffect(() => {
    if (!id){
        return;
    }
    axios
      .get("http://localhost:8080/api/users/getUser/"+id)
      .then((res) => setUser(res.data));
  }, [id]);

  const handleReview = async (id) =>  {
      navigate("/ReviewSubmit/"+id);
      window.location.reload()
  };
  
  const handleReturnProd = async(order, prod) => {
    const b = {order: order, 
      prod: {
        product: prod.product,
        quantity: prod.quantity,
        price: prod.price
      }}
    axios.post("http://localhost:8080/api/orders/createRefund", b);
    window.location.reload();
  }

  const handleCancelOrder = async(id) => {
    axios.post("http://localhost:8080/api/orders/deleteOrder/"+id);
    window.location.reload();
  }

  const isWithin30Days = (orderDate) => {
    const currentDate = new Date(Date.now())
    const differenceInTime = currentDate.getTime() - new Date(orderDate).getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 30;
  };

  return (
      <Container>
        <Main>
          <ProfileContainer>
            <h2> Profile </h2>
            <p>Name: {user.name} {user.surname}</p>
            <p>Tax ID: {user.taxId}</p>
            <p>Email: {user.email}</p>
            <p>Home Address: {user.address}</p>
          </ProfileContainer>
          <OrderContainer>
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
              orders.map((order) => 
                
                ( 
                
                <OrderDetail key={order.id}>
                  <AddressComponent>
                    <h4>Shipping Address</h4>
                    <div>
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.addressLine1}</p>
                      <p>{order.shippingAddress.addressLine2}</p>
                      <p>
                        {order.shippingAddress.city} {order.shippingAddress.state}
                      </p>
                      <p>Phone : {order.shippingAddress.phoneNumber}</p>
                    </div>
                  </AddressComponent>
                  <OrderBasket>
                    <h4>Order</h4>
                    <p>
                      Status: <span>{order.status}</span>
                    </p>
                    <p>
                      Total: $<span>{order.totalPrice}</span>
                    </p>
                    {order.status === 'processing' ? (
                          <button  onClick={() => handleCancelOrder(order._id)} style={{ 
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            padding: '10px 24px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '10px 0 0 10px',
                            verticalAlign: 'middle'
                          }}>Cancel Order</button>
                        ): (<></>)}
                        <p>
                      
                    </p>
                    {order.items.map((item) => (
                      <Product key={item.id}>
                        <Image>
                          {prods.map((prod) => {
                            if (prod._id === item.product) {
                              return <img key={prod.id} src={prod.images[0]} alt="" />;
                            }
                            return null;
                          })}
                        </Image>
                        <Description>
                          <div className="product-info">
                          {prods.map((prod) => {
                            if (prod._id === item.product) {
                              return <h4 key={prod.id} >{prod.Pname}</h4>;
                            }
                            return null;
                          })}
                          <p>
                            Quantity: <span>{item.quantity}  </span>
                          </p>
                          <p>Subtotal: $<span>{item.price * item.quantity}</span></p>
                          {order.status === 'delivered' ? (
                          <button  onClick={() => handleReview(item.product)} style={{ 
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            padding: '10px 24px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '10px 0 0 10px',
                            verticalAlign: 'middle'
                          }}>Review</button>
                        ): (null)}
                          
                          {item.status === 'delivered' && order.status === 'delivered' && isWithin30Days(order.dateOrdered)? (
                          <button  onClick={() => handleReturnProd(order._id, item)} style={{ 
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            padding: '10px 24px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '10px 0 0 10px',
                            verticalAlign: 'middle'
                          }}>Return</button>
                        ): (null)}
                          {item.status === 'pending' ? (
                          <button disabled style={{ 
                            backgroundColor: 'gray',
                            border: 'none',
                            color: 'white',
                            padding: '10px 24px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '10px 0 0 10px',
                            verticalAlign: 'middle'
                          }}>Return Pending</button>
                        ): (<></>)}
                          {item.status === 'returned' ? (
                          <button disabled style={{ 
                            backgroundColor: 'red',
                            border: 'none',
                            color: 'white',
                            padding: '10px 24px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '10px 0 0 10px',
                            verticalAlign: 'middle'
                          }}>Returned</button>
                        ): (<></>)}
                          </div>
                        </Description>
                      </Product>
                    ))}
                  </OrderBasket>
                </OrderDetail>
              ))
            ) : (
              <h4>You do not have any orders yet.</h4>
            )}
          </OrderContainer>
        </Main>
      </Container>
    );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1400px;
  margin: auto;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column; /* Added */
  align-items: center; /* Added */
`;

const OrderContainer = styled.div`
  margin-top: 20px; /* Added */
  padding: 15px;
  background-color: #fff;
  width: 75%;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const ProfileContainer = styled.div`
  margin-bottom: 20px; /* Added */
  padding: 15px;
  background-color: #fff;
  width: 75%;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const OrderDetail = styled.div`
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
`;

const AddressComponent = styled.div`
  margin-top: 20px;
  div {
    margin-top: 10px;
    margin-left: 10px;
    p {
      font-size: 14px;
      margin-top: 4px;
    }
  }
`;

const OrderBasket = styled.div`
  margin-top: 20px;
  p {
    font-size: 15px;
    margin-left: 15px;
    margin-top: 15px;
    span {
      font-weight: 600;
    }
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 100%;
  }
`;
const Description = styled.div`
  flex: 0.7;
  h4 {
    font-weight: 600;
    font-size: 18px;
    margin-left: 15px;
    @media only screen and (max-width: 1200px) {
      font-size: 14px;
    }
  }
  p {
    font-weight: 600;
    margin-top: 10px;
  }
  button {
    
    background-color: #1384b4;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #0e6d97;
    }
  }
`;
export default Orders;
