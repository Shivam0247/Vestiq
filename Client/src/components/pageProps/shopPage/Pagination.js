import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import AddToCart from "../../home/Products/AddToCart";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@heroui/pagination";
const PaginationProduct = ({ itemsPerPage }) => {
  const [items, setItems] = useState([]); // State to hold fetched items
  const [loading, setLoading] = useState(true); // Loading state
  const [itemOffset, setItemOffset] = useState(0); // Offset for pagination

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCartClick = (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Fetch items dynamically from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://upstrides-server.vercel.app/api/Product/ProductDisplay"
        ); // Replace with your API URL
        const data = await response.json();
        setItems(data); // Set fetched items in state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchItems(); // Call the fetch function on component mount
  }, []);

  // Handle page click for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  // Determine the current page's items
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const Loader = () => (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isModalOpen && (
        <AddToCart product={selectedProduct} onClose={handleCloseModal} />
      )}
      <div class="icon-container group flex items-center rounded-full bg-black w-14 h-14 pt-1 z-10 cursor-pointer hover:w-48 transition-all duration-300 sticky top-5 left-[94%]">
        <i class="fi fi-rr-settings-sliders text-white text-xl ml-4"></i>
        <span class="absolute left-14 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bottom-5">
          FILTER AND SORT
        </span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-4 mt-[-65px]">
        {currentItems.map((product) => (
          <div key={product._id} className="w-full">
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
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Pagination
          loop
          showControls
          color="primary"
          initialPage={1}
          total={5}
        />
      </div>
    </>
  );
};

export default PaginationProduct;
