import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import WishlistCard from "../WishlistCard";

function Wishlist  ({}) {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [prods, setProds] = useState([]);

  
    useEffect(() => {
        setLoading(true);

        let {userId, token} = localStorage;

        if (!userId) {
            const randomUserId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('userId', randomUserId);
            userId = randomUserId;
        }
        const config = {
            headers: {
                'x-access-token': token,
                'userId': userId
            }
        };

        try {
            axios
            .get("http://localhost:8080/api/wishlists/"+userId, config)
            .then((response) =>
                {
                setWishlist(response.data);
                localStorage.setItem("wishlistId", response.data._id)
                setLoading(false)
                //setWishlistData(response.data)
                const productRequests = response.data.products.map((product) =>
                axios
                  .get("http://localhost:8080/api/products/prodID/" + product.productId)
                  .then((res) => res.data)
                  .catch((error) => console.log(error))
              );
      
              Promise.all(productRequests).then((products) => {
                setProds(products);
              });
                console.log(prods.length)
                }
                )
        } catch (error) {
            setLoading(false);
        }
        
    }, []);

    

    if (loading) {
        return <p>Loading wishlist...</p>;
    }


    return (
        <div>
            <div className="container">
                <ul className='columnList'>
                     
                  {prods.length > 0 ? (prods.map(item=>(
                    <li key={item._id}><WishlistCard item={item} ></WishlistCard></li>
                  ))): 
                  (<h4>Your wishlist is empty.</h4>)
                  }
                </ul>
            </div>
        </div>
      )

}

export default Wishlist;
