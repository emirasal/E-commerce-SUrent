import React, {useState,useEffect} from 'react'
import axios from "axios";
import ProductCard from "./ProductCard";
import "./listprods.css"
import { useParams } from 'react-router-dom';


function ListProds() {

    const { id } = useParams();

    //data is initially an empty list
    const [data,setData] = useState([]); 

    useEffect(()=>{
      axios.get('http://localhost:8080/api/products/sort/' + id).then(response=>{
        setData(response.data);
      }).catch(error=>{
        console.log(error,);
      });
    },[]);

  return (
    <div className='sort-page'>
        <div className="container">
          <h5>Sorted by their {id}: (descending)</h5>
            <ul className='columnList'>
              {data.map(item=>(
                <li key={item._id}><ProductCard item={item} ></ProductCard></li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default ListProds