import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Item from "./Items";
import Rating from './Rating';
import ListReviews from './ListReviews';
import Herosection from "./Herosection";
import { BrowserRouter } from 'react-router-dom';


describe("Item component", () => {
  test("renders an image with specified width and height", () => {
    const item = "https://iili.io/HSI6yxf.md.png";
    render(<Item item={item} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", item);
    expect(image).toHaveAttribute("width", "675");
    expect(image).toHaveAttribute("height", "675");
  });
});

  describe("Rating component", () => {
    test("renders the review number", () => {
      render(<Rating rating={3} numReviews={10} />);
  
      // Check that the correct number of reviews is displayed
      expect(screen.getByText("10 reviews")).toBeInTheDocument();
    })});

    describe("List Review", () => {
        test("List the review with given information", () => {
          let reviews = [{
            approved: true,
            _id: "1234",
            user_name: "user",
            rating: 2,
            comment: "great"
          }];

          render(<ListReviews reviews={reviews} />);
          expect(screen.getByText("by user")).toBeInTheDocument();
          expect(screen.getByText("great")).toBeInTheDocument();

        });

        test("No listing as review is not approved", () => {
            let reviews = [{
              approved: false,
              _id: "1234",
              user_name: "user",
              rating: 2,
              comment: "great"
            }];
  
            const {container} = render(<ListReviews reviews={reviews} />);
            
            expect(container.firstChild).toBeEmpty();
  
          });

        test("No listing as no review", () => {
            let reviews = [];
  
            const {container} = render(<ListReviews reviews={reviews} />);
            
            expect(container.firstChild).toBeEmpty();
          })

          test("Multiple Review Listing", () => {
            let reviews = [{
              approved: true,
              _id: "1234",
              user_name: "user",
              rating: 2,
              comment: "great"
            }, {
              approved: true,
              _id: "5678",
              user_name: "userAlt",
              rating: 3,
              comment: "not bad"
            }];
  
            render(<ListReviews reviews={reviews} />);
            
            expect(screen.getByText("by user")).toBeInTheDocument();
            expect(screen.getByText("great")).toBeInTheDocument();
            expect(screen.getByText("by userAlt")).toBeInTheDocument();
            expect(screen.getByText("not bad")).toBeInTheDocument();
          })
        
    
    
    });

    describe("Herosection", () => {
      test("renders a static video and a button directing to products", () => {

        const container = render(<BrowserRouter>
                    <Herosection />
              </BrowserRouter>);
        const body = document.body.firstChild;
        const video = body.querySelector('video')
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute("src", "/videos/video1.mp4");
        expect(video).toHaveAttribute("autoPlay");
        expect(video).toHaveAttribute("loop");
        //expect(video).toHaveAttribute("muted");

        expect(screen.getByText("RENT FROM THE BEST")).toBeInTheDocument();
        expect(screen.getByText("check out our site for renting quality clothes")).toBeInTheDocument();

        const anchor = container.getByRole('link');
        expect(anchor).toHaveAttribute("href", "/Prods");
        

      });
    });


  
