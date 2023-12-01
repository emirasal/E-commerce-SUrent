import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./prodmanOrders.css";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    updateDisplayedPages();
  }, [currentPage, orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders/getOrders');
      setOrders(response.data.map(order => ({
        ...order,
        selectedOrderId: '',
        newStatus: ''
      })));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event, orderId) => {
    event.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:8080/api/orders/update/${orderId}`, {
        status: getOrderStatus(orderId)
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }

    // Clear form fields
    setOrderStatus(orderId, '');
    window.location.reload();
  };

  const getOrderStatus = (orderId) => {
    const order = orders.find(order => order._id === orderId);
    return order ? order.newStatus : '';
  };

  const setOrderStatus = (orderId, status) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order._id === orderId) {
        return {
          ...order,
          newStatus: status
        };
      }
      return order;
    }));
  };

  const updateDisplayedPages = () => {
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const pagesToShow = 3;
    const half = Math.floor(pagesToShow / 2);

    let startPage = Math.max(currentPage - half, 1);
    let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    if (totalPages - endPage < half) {
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    setDisplayedPages(pages);
  };

  // Get current orders for the selected page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Order List</h2>
      {currentOrders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span>Status: {order.status}</span>
            <form onSubmit={(event) => handleSubmit(event, order._id)}>
              <label>
                <select
                  value={getOrderStatus(order._id)}
                  onChange={(event) => setOrderStatus(order._id, event.target.value)}
                  required
                >
                  <option value="">Select a status</option>
                  <option value="delivered">Delivered</option>
                  <option value="in-transit">In transit</option>
                </select>
              </label>
              <button type="submit">Update Status</button>
            </form>
            <span>Date: {new Date(order.dateOrdered).toLocaleDateString()}</span>
          </div>
          <div className="order-details">
            <div className="order-info">
              <span>Delivery ID: {order._id}</span>
              <span>Customer ID: {order.user}</span>
              <span>Total Price: {order.totalPrice}</span>
              <span>
                Shipping Address: {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.country}
              </span>
              <span>Products:</span>
              {order.items.map((prod) => (
                <div key={prod.product} className="order-info">
                  <span>Product ID: {prod.product}</span>
                  <span>Quantity: {prod.quantity}</span>
                </div>
              ))}
            </div>
            {/* Render other order details as needed */}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button className="arrow" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
          &lt;
        </button>
        {displayedPages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          className="arrow"
          disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
          onClick={() => paginate(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default OrderList;