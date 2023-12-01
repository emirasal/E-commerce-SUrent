import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"; /*link replaces an a tag */
import {useNavigate} from "react-router-dom";
import "./Navbar.css";
import {Button} from "./Button";

import Cart from "./cart/Cart";
import Wishlist from "./pages/Wishlist";
/* this app uses font awesome and some free videos and pictures provided by pexels */

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [accessToken, setAccessToken] = useState(true);
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [isAdmin, setIsAdmin] = useState(true);
    const [showAdminMenu, setShowAdminMenu] = useState(false);

    
    const handleClick = () => {
        setClick(!click); /* reverse the value whenever you click it*/
    };

    const closeMobileMenu = () => {
        setClick(false);
    };

    const logout = () => {
        setAccessToken(null);
        navigate('/login');
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.removeItem("isCustomer")
        localStorage.removeItem("isAdmin")
        window.location.reload()
    };

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, [accessToken]);

    useEffect(() => {
        setAccessToken(localStorage.getItem("token"));
    }, [accessToken]);
    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    });

    useEffect(() => {
        setIsAdmin(localStorage.getItem("isAdmin") === 'true'); // Set isAdmin state
    }, [accessToken]);

    window.addEventListener(
        "resize",
        showButton
    ); 


    const toggleProfile = () => {
        let subMenu = document.getElementById("subMenu");
        subMenu.classList.toggle("open-products");
        setClick(false);
      };

    const toggleAdminMenu = () => {
        let adminSubMenu = document.getElementById("adminSubMenu");
        if(adminSubMenu){
            adminSubMenu.classList.toggle("open-admin");
        }
    };
    
    
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        SUrent<i className="fa-solid fa-shirt"/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}/>
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/products"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-links"
                                onClick={closeMobileMenu}
                             to={Cart}>
                                <Cart/>
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            {accessToken ?
                                <Link className="nav-links-mobile" onClick={logout}>Logout</Link> :
                                <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}> Get
                                    Started </Link>}
                        </li>
                        
                    </ul>
                    {button ? (
                        accessToken ? (
                            <>

                            <div class="sub-menu-wrap" id="subMenu">
                                <div class="sub-menu">
                                <Link class="sub-products-link" to= {"/wishlist/"+userId}>
                                <i class="fa-sharp fa-solid fa-heart">&nbsp;</i>
                                    <h5>My Wishlist</h5>
                                </Link>
                                <hr></hr>

                                <Link class="sub-products-link" to= {"/GetOrders/"+userId} >
                                <i class="fas fa-envelope"></i>
                                    <h5>My orders</h5>
                                </Link>
                                <hr></hr>

                                <Link class="sub-products-link" onClick={logout}>
                                <i class="fas fa-times"></i>
                                    <h5>Logout</h5>
                                </Link>
                                <hr></hr>


                                </div>
                            </div>


                            <Button onClick={toggleProfile} buttonStyle="btn--outline">
                                <div class="profile-iconandtext">
                                    <i class="fas fa-user"></i>
                                    <h5>Profile</h5>
                                </div>

                            </Button>



                            {isAdmin && (
                                    <>
                                        <div className="dropdown">
                                            <Button onClick={toggleAdminMenu} buttonStyle="btn--outline">
                                                <div className="profile-iconandtext">
                                                <i className="fas fa-user-shield"></i>
                                                <h5>Admin</h5>
                                                </div>
                                            </Button>
                                                <div className="sub-menu-wrap" id="adminSubMenu">
                                                    <div className="sub-menu">
                                                    <Link className="sub-products-link" to="/prodMan">
                                                        <i className="fas fa-tools"></i>
                                                        <h5>Prod_Man</h5>
                                                    </Link>
                                                    <hr></hr>

                                                    <Link className="sub-products-link" to="/salesMan">
                                                        <i className="fas fa-chart-line"></i>
                                                        <h5>Sales_Man</h5>
                                                    </Link>
                                                    <hr></hr>
                                                    </div>
                                                </div>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <Button destination="/login" buttonStyle="btn--outline">
                            Explore
                            </Button>
                        )
                    ) : (
                        ""
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;