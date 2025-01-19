import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {
  const [bestSeller, setBestSeller] = useState([]);
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
          (product) => product.ProductCategory === "BestSellers"
        );
        setBestSeller(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {bestSeller.map((product) => (
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

export default BestSellers;
