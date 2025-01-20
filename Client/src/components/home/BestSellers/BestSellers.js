import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import AddToCart from "../Products/AddToCart";

import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCartClick = (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Fetch New Arrivals from the backend
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          "https://upstrides-server.vercel.app/api/Product/ProductDisplay"
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
    <>
      {isModalOpen && (
        <AddToCart product={selectedProduct} onClose={handleCloseModal} />
      )}

      <div className="w-full pb-20">
        <Heading heading="Our Bestsellers" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-4">
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
              onCartClick={handleCartClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSellers;
