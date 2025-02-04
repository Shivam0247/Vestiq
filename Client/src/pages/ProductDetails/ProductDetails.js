import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
const getKeyValue = (obj, key) => obj[key];

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const containerRef = useRef(null);
  const imagesRef = useRef(null);
  const infoRef = useRef(null);
  const sizechartRef = useRef(null);
  const [selectedKeys, setSelectedKeys] = React.useState(() =>
    productInfo.sizes && productInfo.sizes.length > 0
      ? new Set([productInfo.sizes[0]])
      : new Set()
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  const rows = productInfo.SizeChart
    ? productInfo.SizeChart.map((sizeChartItem, index) => ({
        key: index + 1, // Adding the key starting from 1
        ...sizeChartItem, // Spreading the size chart data
      }))
    : [];

  const columns = [
    {
      key: "size",
      label: "SIZES",
    },
    {
      key: "chest",
      label: "CHEST",
    },
    {
      key: "length",
      label: "LENGTH",
    },
    {
      key: "shoulder",
      label: "SHOULDERS",
    },
  ];

  useEffect(() => {
    if (location.state?.item) {
      setProductInfo(location.state.item);
    }
    console.log(location.state.item.sizes);
  }, [location]);

  useEffect(() => {
    const images = imagesRef.current;
    const info = infoRef.current;
    const sizechart = sizechartRef.current;

    if (!images || !info || !sizechart) return;

    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: info,
        start: "bottom bottom",
        end: () =>
          `+=${
            images.scrollHeight - window.innerHeight - sizechart.scrollHeight
          }`, // Dynamically adjust height
        pin: info,
        pinSpacing: false, // Prevent extra spacing issues
        scrub: 1,
      },
    });

    tl.to(images, {
      y: () =>
        -(images.scrollHeight - window.innerHeight - sizechart.scrollHeight), // Adjust dynamically
      ease: "none",
      scrollTrigger: {
        trigger: images,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto flex overflow-hidden min-h-screen pb-20" // Ensure enough space
    >
      <div ref={imagesRef} className="images w-[50%] flex flex-col gap-4 pr-5">
        <img src="/images/image1.jpg" alt="" />
        <img src="/images/image1.jpg" alt="" />
        <img src="/images/image1.jpg" alt="" />
        <img src="/images/image1.jpg" alt="" />
      </div>

      <div
        ref={infoRef}
        className="info w-[50%] h-full px-[6%] flex flex-col mt-16"
      >
        <div>
          <h1 className="text-3xl font-extrabold">
            {productInfo.name ? productInfo.name : "N/A"}
          </h1>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold mt-5">
            INR {productInfo.price ? productInfo.price.toFixed(2) : "N/A"}
          </h1>
        </div>

        <div className="mt-14">
          <div className="flex flex-col">
            <label className="mb-3 font-bold">Select Size</label>
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  {selectedValue || "Select Size"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Size selection"
                selectedKeys={selectedKeys}
                selectionMode="single"
                variant="flat"
                onSelectionChange={setSelectedKeys}
              >
                {productInfo.sizes && productInfo.sizes.length > 0 ? (
                  productInfo.sizes.map((size, index) => (
                    <DropdownItem key={size} aria-label={`Size ${size}`}>
                      {size}
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem disabled>No Sizes Available</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="mt-7">
          <div class="relative flex items-center">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="quantity-input"
              class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
            >
              <svg
                class="w-3 h-3 text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="quantity-input"
              data-input-counter
              aria-describedby="helper-text-explanation"
              class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 "
              placeholder="999"
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="quantity-input"
              class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
            >
              <svg
                class="w-3 h-3 text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="btn mt-10 w-[100%] flex items-center justify-between">
          <Button
            color="primary"
            size="lg"
            className="mr-2 w-[100%] lg:w-[48%] md:w-[48%] sm:w-[100%] xs:w-[100%] my-5 bg-black text-white transition-all duration-300 transform hover:scale-105"
          >
            ADD TO CART
          </Button>

          <Button
            color="primary"
            size="lg"
            className="w-[100%] lg:w-[48%] lg:ml-0 md:w-[48%] sm:w-[100%] xs:w-[100%] xs:ml-0 md:ml-5 sm:ml-0 bg-white border-black text-black border-2 transition-all duration-300 transform hover:scale-105"
          >
            BUY IT NOW
          </Button>
        </div>

        <div className="desc mt-16">
          <p className="text-center">
            {productInfo.Description
              ? productInfo.Description.toUpperCase()
              : "N/A"}
          </p>
        </div>

        <div className="FEATURES mt-10">
          <h3 className="text-center text-lg font-extrabold mb-3">FEATURES</h3>
          {productInfo.Features && productInfo.Features.length > 0
            ? productInfo.Features.map((Feature, index) => (
                <p key={index} className="text-center">
                  {Feature.toUpperCase()}
                </p>
              ))
            : null}
        </div>

        <div className="Care mt-10">
          <h3 className="text-center text-lg font-extrabold mb-3">
            COMPOSITION & CARE
          </h3>
          {productInfo.CompositionAndCare &&
          productInfo.CompositionAndCare.length > 0
            ? productInfo.CompositionAndCare.map((Composition_Care, index) => (
                <p key={index} className="text-center">
                  {Composition_Care.toUpperCase()}
                </p>
              ))
            : null}
        </div>

        <div ref={sizechartRef} className="sizeChart mt-10 mb-10">
          <h3 className="text-center text-lg font-extrabold mb-5">
            SIZE CHART
          </h3>
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
