import {useEffect, useState} from 'react';
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import InvoicePDF from '../InvoicePDF';

function InvoicesForSM() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [startDate,setStartDate]= useState(new Date());
  const [endDate,setEndDate]= useState(new Date());
  const [prods, setProds] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/orders/getOrders")
    .then((response)=>{
      setOrders(response.data);
      setAllOrders(response.data);
    })

  },[])
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/getAll")
      .then((res) => setProds(res.data));
  }, []);

  const handleSelect = (date) =>{
    let filtered = allOrders.filter((order)=>{
      let orderDate = new Date(order["dateOrdered"]);
      return(orderDate>= date.selection.startDate &&
        orderDate<= date.selection.endDate);
    })
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setOrders(filtered);
  };

  const handleInvoice = async (order) =>  {
    InvoicePDF.generateInvoiceForSM(order.shippingAddress, order.items, prods);
    };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };


  return (
    <div className="App">
      <header className="App-header">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
        <table>
          <thead>
            <tr>
              <th>ID </th>
              <th>Status </th>
              <th>Date </th>
            </tr>
          </thead>
          <tbody>
            
              {orders.map((order)=>{
                let date = new Date(order["dateOrdered"]);
                return(
                  <tr>
                    <td>{order["_id"]}</td>
                    <td>{order["status"]}</td>
                    <td>{date.toLocaleDateString()}</td>
                   
                    <button  onClick={() => handleInvoice(order)} style={{ 
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
                          }}>Invoice</button>
                  </tr>
                );
              })}
            
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default InvoicesForSM;