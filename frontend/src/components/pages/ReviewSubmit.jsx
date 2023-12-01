//import "./login.css";
import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Rating} from "@mui/material";


function ReviewSubmit(props) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [accessToken, setAccessToken] = useState(true);

    useEffect(() => {
        setAccessToken(localStorage.getItem("token"));
    }, [accessToken]);

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('http://localhost:8080/api/products/prodID/'+id).then(response => {
            setProduct(response.data);
            //console.log(response.data);
        });
    }, [id]);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleChangeRating = (event) => {
        setRating(event.target.value)
    }

    if (!product) {
        return 'cannot fetch from database';
    }
    
    const handleChangeComment = (event) => {
        setComment(event.target.value)
    }

    const handleReviewSubmit = async (event) => {
        setError("")
        event.preventDefault();
        
        try {
            await axios.post('http://localhost:8080/api/products/postReview/'+id,  {
                rating,
                comment
            }, 
              {headers: {
                'x-access-token': accessToken,
                'Content-Type': 'application/json'
              }} );
            setMessage("Your review will be posted when approved.");
            navigate('/products/'+id);
            window.location.reload()
        } catch (error) {
            await setError(error.response.data.message)
        }
    }; 

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-1 pb-1">Review for {product.Pname}</h4>
                                                    <img src={product.images[0]} class="img-thumbnail"></img>
                                                    {error ? <div className="alert alert-danger">{error} </div> : ""}
                                                    {message ? <div className="alert alert-danger">{message} </div> : ""}
                                                    <hr/>
                                                    <div className="form-group">
                                                    <Rating
                                                        name="simple-controlled"
                                                      
                                                        onChange={handleChangeRating}
                                                    />
                                            
                                                      
                                                    </div>
                                                    <div className="form-group mt-2">

                                                        <textarea type="comment" className="form-style" placeholder="Your Review" rows="3" onChange={handleChangeComment}></textarea>
                                                        
                                                    </div>
                                                    <button
                                                        onClick={handleReviewSubmit} className="btN mt-4"
                                                    >Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default ReviewSubmit;