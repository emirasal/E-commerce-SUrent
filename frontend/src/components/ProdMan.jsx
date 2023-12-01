import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./ProdMan.css"

function ProdMan() {
  return (
    <div className="admin-panel">
      <div className="admin-section">
        <h1>Manage Products</h1>
        <div className='hint'>
          By following this link, you can add new products as a product manager !
        </div>
        <Link to="/ManageProds">
          <button>Add product</button>
        </Link>
      </div>
      <div className="admin-section">
        <h1>Manage Categories</h1>
        <div className='hint'>
          By following this link, you can add new category to your store!
        </div>
        <Link to="/ManageCategories">
          <button>Add new category</button>
        </Link>
      </div>
      <div className="admin-section">
        <h1>Determine stocks</h1>
        <div className='hint'>
          By following this link, you can add more items to your stock!
        </div>
        <Link to="/Determinestocks">
          <button>Add to stocks</button>
        </Link>
      </div>
      <div className="admin-section">
        <h1>Order details</h1>
        <div className='hint'>
          By following this link, you can view the order details such as invoices, product status.
        </div>
        <Link to="/Orderdetails">
          <button>View</button>
        </Link>
      </div>
      <div className="admin-section">
        <h1>Comments</h1>
        <div className='hint'>
          By following this link, you can approve comments.
        </div>
        <Link to="/Products2">
          <button>View</button>
        </Link>
      </div>
    </div>
  )
}

export default ProdMan
