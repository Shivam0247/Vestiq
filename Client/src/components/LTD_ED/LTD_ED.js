import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import PaginationProduct from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const LTD_ED = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-[100%] mx-auto px-4">
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-full mt-5">
          <PaginationProduct itemsPerPage={itemsPerPage} Category={"LTD_ED"} />
        </div>
      </div>
    </div>
  );
};

export default LTD_ED;
