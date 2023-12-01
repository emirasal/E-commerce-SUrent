import React, { useState, useEffect } from 'react';
import Form from '../Form';
import Cart from '../cart/Cart';
import '../Form.css';

function Checkout() {
  const [cartData, setCartData] = useState(null);
  const [loadingCartData, setLoadingCartData] = useState(true);

  useEffect(() => {
    if (cartData !== null) {
      setLoadingCartData(false);
    }
  }, [cartData]);

  return (
    <div className='checkout'>
      <Cart setCartData={setCartData} />
      <Form cartData={cartData} />
    </div>
  );
}

export default Checkout;
