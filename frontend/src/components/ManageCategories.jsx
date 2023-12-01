import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./prodManForms.css";

function UpdateCategoryForm() {

  const [newCategory, setNewCategory] = useState('');
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


  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      await axios.get(`http://localhost:8080/api/products/addCategory/${newCategory}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
      
      setNewCategory('');
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      
      <label>
        Existing Categories:
        <select className='category-dropdown'>
              {categories.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </select>
      </label>
      <label>
        New Category:
        <input
          type="text"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          required
        />
      </label>
      <button type="submit">Add Category</button>    


    </form>




  );
}

export default UpdateCategoryForm;
