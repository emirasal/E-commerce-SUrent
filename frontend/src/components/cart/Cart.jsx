import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import "./Cart.css";

const Cart = ({setCartData}) => {
    const [show, setShow] = useState(false);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        fetchCart();
        setShow(true);
    }

    const fetchCart = async () => {
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
            const response = await axios.get("http://localhost:8080/api/carts", config);
            setCart(response.data);
            
            localStorage.setItem("cartId", response.data._id)
            setLoading(false);
            setCartData(response.data);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (id) => {
        let {userId, token} = localStorage;
        const config = {
            headers: {
                'x-access-token': token,
                'userId': userId
            }
        };

        try {
            await axios.post(`http://localhost:8080/api/removeFromCart`, {
                productId: id
            }, config);
            fetchCart();

        } catch (error) {

        }
    };

    const increaseQuantity = async (id) => {
        let {userId, token} = localStorage;
        const config = {
            headers: {
                'x-access-token': token,
                'userId': userId
            }
        };

        try {
            await axios.post(`http://localhost:8080/api/incrementQuantity`, {
                productId: id
            }, config);
            fetchCart();

        } catch (error) {

        }
    }

    const decreaseQuantity = async (id) => {
        let {userId, token} = localStorage;
        const config = {
            headers: {
                'x-access-token': token,
                'userId': userId
            }
        };

        try {
            await axios.post(`http://localhost:8080/api/decrementQuantity`, {
                productId: id
            }, config);
            fetchCart();

        } catch (error) {

        }
    }


    if (loading) {
        return <p>Loading cart...</p>;
    }

    if (cart && cart.products && cart.products.length === 0) {
        setCart(null)
    }


    const handleCheckout = () => {
        const isCustomer = localStorage.getItem('token');
        if (!isCustomer) {
            navigate("/login");
            localStorage.setItem("updateCart", "true");
            //localStorage.setItem("updateCartUserId", localStorage.getItem());
            window.location.reload()
        } else {
            navigate("/checkout")
            window.location.reload()
        }
    }



    return (
        <div>
            <button className="btn--nooutline" onClick={handleShow}>
                <i class="fas fa-shopping-cart"></i>
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart ? (
                        <div>
                            <div className="cart-items">
                                {cart.products.map((item) => (
                                    
                                    <div className="cart-item" key={item.productId}>
                                        <div className="cart-item-details">

                                            {item && <span className="h3">{item.Pname}</span>}


                                            <span> {item.price} $</span>

                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="cart-item-quantity">
                                                <Button
                                                    variant="danger"
                                                    className="mr-2"
                                                    onClick={() => removeItem(item.productId)}
                                                >
                                                    <i className="fa-sharp fa-solid fa-trash"></i>
                                                </Button>
                                                <button
                                                    className="btn btn-secondary mr-1"
                                                    onClick={() => decreaseQuantity(item.productId)}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="btn btn-success ml-1"
                                                    onClick={() => increaseQuantity(item.productId)}
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                            <div className="cart-total" style={{textAlign: "right"}}>
                                <p>
                                    Total:
                                    <span
                                        className="h2"> {cart.totalPrice}</span>
                                    $</p>
                            </div>
                        </div>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCheckout} className="btn btn-primary">
                        Checkout
                    </button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

};

export default Cart;
