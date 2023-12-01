import React from 'react'
import Footer from '../Footer'
import ListSearchProds from '../listSearchProducts'
import ProductListingNavbar from '../search-category-sort'
import "./Productlisting.css"


export default function Productlisting() {

  return (

    <div className='listed-prods'>

        <ProductListingNavbar></ProductListingNavbar>

        <ListSearchProds></ListSearchProds>
        <div className='footer'>
          <Footer></Footer>
        </div>

    </div>
  )
}