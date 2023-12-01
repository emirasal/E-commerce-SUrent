import React, { useState } from 'react'
import Cards from "react-credit-cards"
import 'react-credit-cards/es/styles-compiled.css'

function PaymentInfo({ formData, setFormData }) {
  const [focus, setFocus] = useState('');

  
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="personal-info-container">

      <Cards
        number={formData.cardNum}
        name={formData.fullName}
        expiry={formData.expiry}
        cvc={formData.cvc}
        focused={focus}
      />
      <form>
        <input className="paymentFormInput"
          type='tel'
          name='cardNum'
          placeholder='Card Number'
          value={formData.cardNum}
          onChange={e => handleChange(e.target.name, e.target.value)}
          onFocus={e => setFocus(e.target.name)}
          maxLength="16"
        />
        <input className="paymentFormInput"
          type='text'
          name='name'
          placeholder='Name'
          value={formData.fullName}
          onChange={e => handleChange(e.target.name, e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <input className="paymentFormInput"
          type='text'
          name='expiry'
          placeholder='MM/YY Expiry'
          value={formData.expiry}
          onChange={e => handleChange(e.target.name, e.target.value)}
          onFocus={e => setFocus(e.target.name)}
          maxLength="5"
        />
        <input className="paymentFormInput"
          type='tel'
          name='cvc'
          placeholder='CVC'
          value={formData.cvc}
          onChange={e => handleChange(e.target.name, e.target.value)}
          onFocus={e => setFocus(e.target.name)}
          maxLength="3"
        />
      </form>
    </div>
  );
}

export default PaymentInfo;
