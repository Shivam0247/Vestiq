import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import PaginationProduct from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const LimitedStock = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-[100%] mx-auto px-4">
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-full mt-5">
          <PaginationProduct itemsPerPage={itemsPerPage} />
        </div>
      </div>
    </div>
  );
};

export default LimitedStock;
