import React from 'react'
import Footer from '../Footer'
import ListSortProds from '../listSortProducts'
import ProductListingNavbar from '../search-category-sort'
import "./Productlisting.css"


export default function Productlisting() {
  
  return (

    <div className='listed-prods'>

        <ProductListingNavbar></ProductListingNavbar>

        <ListSortProds></ListSortProds>
        <div className='footer'>
          <Footer></Footer>
        </div>


    </div>
  )
}