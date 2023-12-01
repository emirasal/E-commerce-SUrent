import React from 'react'
import Footer from '../Footer'
import ListCategoryProds from '../listCategoryProducts'
import ProductListingNavbar from '../search-category-sort'
import "./Productlisting.css"


export default function Productlisting() {
  

  return (

    <div className='listed-prods'>

        <ProductListingNavbar></ProductListingNavbar>

        <ListCategoryProds></ListCategoryProds>
        <div className='footer'>
          <Footer></Footer>
        </div>

    </div>
  )
}