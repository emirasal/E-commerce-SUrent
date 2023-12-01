import React from "react";
import "../../App.css";
import Herosection from "../Herosection";
import Carousel from "../Carousel";
import Footer from "../Footer";

export default function Home() {
  return (
    <>
      <Herosection />
      <Carousel />
      <Footer></Footer>
    </>
  );
}
