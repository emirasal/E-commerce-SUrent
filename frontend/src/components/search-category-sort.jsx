import React, {useState,useEffect} from 'react'

import "./pages/Productlisting.css"

function ProductListingNavbar() {

    const [searchValue, setSearchValue] = useState('');
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products/getCategories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);


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


    

  return (

    <div className='listed-prods'>


        <div className='productsContainer'>
          <form onSubmit={handleSubmit} className='search-bar' >
            <input 
            type='text' 
            placeholder='search anything'
            value={searchValue}
            onChange={handleSearchValueChange}>

            </input>
            <button type='submit'><img src="/icons/search.png" alt="." /></button>
          </form>
          

          <div className='category-selection'>

            <select className='category-dropdown' onChange={(e) => handleCategoryClick(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>



          <div className="sort">
            <h6 className='sorttext'>Sort by</h6>
            <form className='sort-bar'>
              <select id='sorting' className='sort-option'>
                <option value="/sort/price">Price</option>
                <option value="/sort/rating">Rating</option>
                <option value="/sort/popularity">Popularity</option>
              </select>
              <button type='submit' onClick={(e) => {
                e.preventDefault(); 
                const selectedValue = document.getElementById('sorting').value; // Get the value of the selected option
                window.location.href = selectedValue;

              }}>
                <img src="/icons/check-box.png" alt="." />
              </button>
            </form>
          </div>



        </div>



    </div>
  )
}

export default ProductListingNavbar