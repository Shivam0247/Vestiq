import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";

const Pagination = ({ itemsPerPage }) => {
  const [items, setItems] = useState([]); // State to hold fetched items
  const [loading, setLoading] = useState(true); // Loading state
  const [itemOffset, setItemOffset] = useState(0); // Offset for pagination

  // Fetch items dynamically from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://vestiq-server.vercel.app/api/Product/ProductDisplay"
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

  // Loading state
  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {currentItems.map((product) => (
          <div key={product._id} className="w-full">
            <Product
              _id={product._id}
              img={`/images/${product.Images[0]}`}
              productName={product.ProductName}
              price={product.Price}
              color={product.Colors.join(", ")} // Joining multiple colors into a single string
              badge={product.New}
              des={product.Description}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Products from {itemOffset + 1} to {endOffset} of {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
