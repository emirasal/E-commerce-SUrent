import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../ProdMan.css"

function SalesMan() {
    return (
        <div className="admin-panel">
          <div className="admin-section">
            <h1>Set Price for Products</h1>
            <div className='hint'>
              By following this link, you can set prices of products as sales manager !
            </div>
            <Link to="/SetPrice">
              <button>Set Price</button>
            </Link>
        
        </div>
        <div className="admin-section">
            <h1>Set Discount for Selected Items</h1>
            <div className='hint'>
              By following this link, you can set discounts on selected products as sales manager !
            </div>
            <Link to="/SetDiscount">
              <button>Set Discount</button>
            </Link>

        </div>

        <div className="admin-section">
            <h1>Profit/Loss and Revenue Charts</h1>
            <div className='hint'>
              By following this link, you can see profit/loss and revenue charts as sales manager !
            </div>
            <Link to="/profitChart">
              <button>See Charts</button>
            </Link>
        
        </div>

        <div className="admin-section">
            <h1>See Invoices in given date range</h1>
            <div className='hint'>
              By following this link, you can list invoices within a given date range as sales manager !
            </div>
            <Link to="/InvoicesSM">
              <button>See Invoices</button>
            </Link>
        
        </div>

        <div className="admin-section">
            <h1>Approve Refunds</h1>
            <div className='hint'>
              By following this link, you can approve refunds as sales manager !
            </div>
            <Link to="/RefundReqSM">
              <button>Approve Refunds</button>
            </Link>
        
        </div>

        </div>
    )
}

export default SalesMan