import React, { useState, useEffect } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import AddToCart from "../Products/AddToCart";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
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

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          "https://vestiq-server.vercel.app/api/Product/ProductDisplay"
        );
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

  if (loading) {
    return <p className="text-center">Loading New Arrivals...</p>;
  }

  return (
    <>
      {isModalOpen && (
        <AddToCart product={selectedProduct} onClose={handleCloseModal} />
      )}
      <div className="w-full pb-16">
        <Heading heading="New Arrivals" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-4">
          {newArrivals.map((product) => (
            <Product
              key={product._id}
              _id={product._id}
              img1={`/images/${product.Images[0]}`}
              img2={`/images/${product.Images[1]}`}
              productName={product.ProductName}
              price={product.Price}
              color={product.Colors.join(", ")} // Join colors into a string
              badge={product.New}
              description={product.Description}
              onCartClick={handleCartClick} // Pass cart click handler
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NewArrivals;
