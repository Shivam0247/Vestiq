import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch New Arrivals from the backend
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          "https://vestiq-server.vercel.app/api/Product/ProductDisplay"
        ); // Adjust the URL as per your API endpoint
        const data = await response.json();
        const filteredProducts = data.filter(
          (product) => product.ProductCategory === "New Arrivals"
        );
        setNewArrivals(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  // Loading state
  if (loading) {
    return <p className="text-center">Loading New Arrivals...</p>;
  }

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {newArrivals.map((product) => (
          <Product
            _id={product._id}
            img1={`/images/${product.Images[0]}`}
            img2={`/images/${product.Images[1]}`}
            productName={product.ProductName}
            price={product.Price}
            color={product.Colors.join(", ")} // Joining multiple colors into a single string
            badge={product.New}
            des={product.Description}
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
