import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Take a look inside for marveleous products
        </p>
        <p>Rent from the best, if you disslike, just refund it!</p>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Products</h2>
            <Link to="/">Why Surent?</Link>
            <Link to="/">Product Rental</Link>
            <Link to="/">Terms of Services</Link>
          </div>
          <div className="footer-link-items">
            <h2>About us</h2>
            <Link to="/">Who are we?</Link>
            <Link to="/">The development Process</Link>
            <Link to="/">Developers</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact</h2>
            <Link to="/">Contact Us</Link>
            <Link to="/">Help center</Link>
            <Link to="/">Talk to sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
