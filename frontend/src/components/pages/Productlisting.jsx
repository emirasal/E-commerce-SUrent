import Footer from '../Footer'
import ListProds from '../listProds'
import ProductListingNavbar from '../search-category-sort'
import "./Productlisting.css"


export default function Productlisting() {


  return (

    <div className='listed-prods'>

        <ProductListingNavbar></ProductListingNavbar>

        <ListProds></ListProds>
        <div className='footer'>
          <Footer></Footer>
        </div>

    </div>
  )
}