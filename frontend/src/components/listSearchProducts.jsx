import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './listprods.css';
import { useParams } from 'react-router-dom';

function ListProds() {
  const { id } = useParams();

  //data is initially an empty list
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/products/prodName/' + id)
      .then(response => {
        setData(response.data);
        setNotFound(false);
      })
      .catch(error => {
        console.log(error);
        setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return (
      <div className='container'>
        <h5>Searched text: {id}</h5>
        <h2 style={{ textAlign: "center", margin: "auto", padding: 45 }}>Sorry, nothing is found...</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
      <h5>Searched text: {id}</h5>
        <ul className="columnList">
          {data.map(item => (
            <li key={item._id}>
              <ProductCard item={item}></ProductCard>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListProds;
