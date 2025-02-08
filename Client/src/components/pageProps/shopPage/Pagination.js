import React, { useState, useEffect } from "react";
import Product from "../../home/Products/Product";
import FilterSidebar from "../../filterSidebar/FilterSidebar";
import { Pagination } from "@heroui/pagination";

const PaginationProduct = ({ itemsPerPage = 3, Category }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    availability: [],
    types: [],
    price: null,
  });
  const [totalProducts, setTotalProducts] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://upstrides-server.vercel.app/api/Product/ProductDisplay"
        );
        const data = await response.json();

        const filteredData =
          Category === "ALL"
            ? data
            : data.filter((item) => item.Category?.[0] === Category);

        setItems(filteredData);
        setFilteredItems(filteredData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [Category]);

  useEffect(() => {
    if (!items.length) return;

    let updatedItems = [...items];

    if (selectedFilters.availability.length > 0) {
      updatedItems = updatedItems.filter((item) => {
        const status = item.InStock === true ? "In stock" : "Out of stock";
        return selectedFilters.availability.includes(status);
      });
    }

    if (selectedFilters.types.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.types.includes(item.ProductType)
      );
    }

    // ✅ Filter by Price
    if (selectedFilters.price) {
      const { min, max } = selectedFilters.price;
      updatedItems = updatedItems.filter(
        (item) => item.Price >= min && item.Price <= max
      );
    }

    switch (sortBy) {
      case "price-low-high":
        updatedItems.sort((a, b) => a.Price - b.Price);
        break;
      case "price-high-low":
        updatedItems.sort((a, b) => b.Price - a.Price);
        break;
      case "name-a-z":
        updatedItems.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
        break;
      case "name-z-a":
        updatedItems.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
        break;
      default:
        break;
    }

    setFilteredItems(updatedItems);
    setCurrentPage(1);
    console.log("totalProducts", totalProducts);
  }, [selectedFilters, items, sortBy]);

  useEffect(() => {
    setTotalProducts(filteredItems.length);
  }, [filteredItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  console.log("currentItems:", currentItems);

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
        setSelectedFilters={setSelectedFilters}
        totalProducts={totalProducts}
        selectedFilters={selectedFilters}
        setSortBy={setSortBy}
        Category={Category}
      />

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
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            loop
            showControls
          />
        </div>
      )}
    </>
  );
};

export default PaginationProduct;
