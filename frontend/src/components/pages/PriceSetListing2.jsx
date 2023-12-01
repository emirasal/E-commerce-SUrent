import React, { useState } from 'react'
import Footer from '../Footer'
import ListSetCards from '../ListSetCards2'
import "./Productlisting.css";


export default function PriceSetListing() {
  console.log(window.location.href)
  const [searchValue, setSearchValue] = useState('');

  return (

    <div className='listed-prods'>
        
        <ListSetCards></ListSetCards>
        <div className='footer'>
          <Footer></Footer>
        </div>
    </div>
  )
}