import React, { useState, useEffect } from "react";
import Product from "../../home/Products/Product";
import AddToCart from "../../home/Products/AddToCart";
import FilterSidebar from "../../filterSidebar/FilterSidebar";
import { Pagination } from "@heroui/pagination"; // ✅ Using Hero UI Pagination

const PaginationProduct = ({ itemsPerPage = 3, Category }) => {
  const [items, setItems] = useState([]); // ✅ Store all products
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // ✅ Track current page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://upstrides-server.vercel.app/api/Product/ProductDisplay"
        );
        const data = await response.json();

        setItems(
          Category === "ALL"
            ? data
            : data.filter(
                (item) => item.Category && item.Category[0] === Category
              )
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [Category]);

  const totalPages = Math.ceil(items.length / itemsPerPage); // ✅ Dynamic total pages
  console.log("totalPages", totalPages);
  // ✅ Get products for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        Category={Category}
      />

      {isModalOpen && (
        <AddToCart
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Filter Button */}
      <div
        className="icon-container group flex items-center rounded-full bg-black w-14 h-14 pt-1 z-10 cursor-pointer hover:w-48 transition-all duration-300 sticky top-5 left-[94%]"
        onClick={() => setIsSidebarOpen(true)}
      >
        <i className="fi fi-rr-settings-sliders text-white text-xl ml-4"></i>
        <span className="absolute left-14 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bottom-5">
          FILTER AND SORT
        </span>
      </div>

      {/* Products Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-[-65px]">
        {currentItems.map((product) => (
          <div key={product._id} className="w-full h-full">
            <Product
              _id={product._id}
              img1={`/images/Tshirts/${product.Images[0]}`}
              img2={`/images/Tshirts/${product.Images[1]}`}
              images={product.Images}
              productName={product.ProductName}
              price={product.Price}
              sizes={product.Sizes}
              Description={product.Description}
              Features={product.Features}
              CompositionAndCare={product.CompositionAndCare}
              SizeChart={product.SizeChart}
              Status={product.Status}
              onCartClick={() => setSelectedProduct(product)}
            />
          </div>
        ))}
      </div>

      {/* ✅ Pagination - Shows only if there's more than 1 page */}
      {totalPages >= 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            loop
            showControls
            color="primary"
          />
        </div>
      )}
    </>
  );
};

export default PaginationProduct;
