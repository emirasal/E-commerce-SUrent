import React, { useState } from 'react'
import Footer from '../Footer'
import ListProds2 from '../listProdsComment';
import "./Productlisting.css";


export default function Productlisting2() {
  console.log(window.location.href)
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue) {
      window.location.href = `/search/${searchValue}`;
    }
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  function handleCategoryClick (text) {
    window.location.href = `/category/${text}`;
  };
  window.scrollTo(0, 0);






  const handleGraphSubmit = (event) => {
    event.preventDefault(); // Prevent the form from being submitted normally

    // Get the start and end date values
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    console.log("asdadada");
    // Redirect to the desired page with the date values in the URL
    window.location.href = '/revenue/' + startDate + '/' + endDate;
  }












  return (

    <div className='listed-prods'>

        <div className='productsContainer'>







        </div>



        <ListProds2></ListProds2>
        <div className='footer'>
          <Footer></Footer>
        </div>







        <form id="dateForm" onSubmit={handleGraphSubmit}>
          <label for="start">Start Date:</label>
          <input type="date" id="start" name="start" />

          <label for="end">End Date:</label>
          <input type="date" id="end" name="end" />

          <button type="submit">Submit</button>
        </form>









    </div>
  )
}