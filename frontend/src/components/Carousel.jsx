import React from "react";
import Carditems from "./Carditems";
/*we might mvoe this to product page, we shall see xd */
import "./Carousel.css";

function Carousel() {
  return (
    <div className="cards">
      <h1>Some of our Products</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <Carditems
              src="images/img1.jpg"
              text="Elevate your street style with our luxurious hoodies, designed for effortless comfort and sophistication."
              label="Urban"
              path="/category/urban"
            />
            <Carditems
              src="images/img2.jpg"
              text="Experience luxury at its finest with our premium high-end bag collection!"
              label="bags"
              path="/category/bag"
            />
            <Carditems
              src="images/img3.jpg"
              text="Indulge in the luxurious comfort of our premium t-shirts, crafted with the finest materials and attention to detail."
              label="t-shirts"
              path="/category/t-shirt"
            />
          </ul>
        </div>
        <div className="cards__wrapper">
          <ul className="cards__items">
            <Carditems
              src="images/img4.jpg"
              text="Unleash your inner elegance with our exquisite shoe collection, crafted with perfection in every step"
              label="Shoes"
              path="/category/shoes"
            />
            <Carditems
              src="images/img5.jpg"
              text="Elevate your style with our luxurious dress collection, designed to enhance your natural beauty and sophistication"
              label="Dresses"
              path="/category/dress"
            />
            <Carditems
              src="images/img6.jpg"
              text="Elevate your style and confidence with our luxurious suits, crafted with meticulous attention to detail."
              label="Suits"
              path="/category/suit"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
