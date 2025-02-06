import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Product from "../../components/home/Products/Product";
import AddToCart from "../../components/home/Products/AddToCart";
import { Card, CardContent } from "../../components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import "./ProdcutsDetails.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/orebiSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/Carousel";

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
  const { _id } = useParams();
  const dispatch = useDispatch();

  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [productquantity, setProductquantity] = useState(1);

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

  const handleSizeChange = (keys) => {
    const selectedKey = Array.from(keys)[0]; // Convert set to array and get first value
    setSelectedSize(selectedKey);
  };

  const incrementQuantity = () => {
    setProductquantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setProductquantity((prev) => (prev > 1 ? prev - 1 : 1)); // Ensure it doesn't go below 1
  };
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("hasReloaded"); // Reset for next visit
    }
  }, []);

  useEffect(() => {
    if (location.state?.item) {
      setProductInfo(location.state.item);
    }
  }, [location]);

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
        pinSpacing: true, // Prevent extra spacing issues
        scrub: 1,
      },
    });

    tl.to(images, {
      y: () =>
        -(images.scrollHeight - window.innerHeight - sizechart.scrollHeight),
      ease: "none",
      scrollTrigger: {
        trigger: images,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const [loading, setLoading] = useState(true);
  console.log(_id, "id");

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(
          "https://upstrides-server.vercel.app/api/Product/ProductDisplay"
        );
        const data = await response.json();

        // Filter out the product with the same _id as the one to exclude
        const filteredProducts = data.filter((product) => product._id !== _id);

        // Limit to 4 products
        setNewArrivals(filteredProducts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, [_id]);

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full mx-auto flex overflow-hidden min-h-screen pb-20 hidden-904"
      >
        <div
          ref={imagesRef}
          className="images w-[50%] flex flex-col gap-4 pr-5"
        >
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
                    {selectedSize || "Select Size"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Size selection"
                  selectionMode="single"
                  variant="flat"
                  selectedKeys={new Set([selectedSize])} // Ensure the selected size stays active
                  onSelectionChange={handleSizeChange}
                >
                  {productInfo.sizes && productInfo.sizes.length > 0 ? (
                    productInfo.sizes.map((size) => (
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
                className="bg-white hover:bg-gray-50 border rounded-s-lg p-3 h-11 focus:outline-none"
                onClick={decrementQuantity}
              >
                <svg
                  className="w-3 h-3 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>

              <input
                type="text"
                className="bg-[#f2f2f2] border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                value={productquantity}
                readOnly
              />

              <button
                type="button"
                className="bg-white hover:bg-gray-50 border rounded-r-lg p-3 h-11 focus:outline-none"
                onClick={incrementQuantity}
              >
                <svg
                  className="w-3 h-3 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
              onPress={(event) => {
                dispatch(
                  addToCart({
                    _id: productInfo?._id,
                    name: productInfo?.name,
                    quantity: productquantity,
                    image: productInfo?.image,
                    badge: productInfo?.badge,
                    price: productInfo?.price,
                    colors: productInfo?.colors,
                    size: selectedSize,
                  })
                );
              }}
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
            <h3 className="text-center text-lg font-extrabold mb-3">
              FEATURES
            </h3>
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
              ? productInfo.CompositionAndCare.map(
                  (Composition_Care, index) => (
                    <p key={index} className="text-center">
                      {Composition_Care.toUpperCase()}
                    </p>
                  )
                )
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

      <div className="visible-904 hidden w-full flex-col mt-5">
        <div>
          <h1 className="text-3xl font-semibold text-left mx-5">
            {productInfo.name ? productInfo.name : "N/A"}
          </h1>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-left mx-5 mt-2">
            INR {productInfo.price ? productInfo.price.toFixed(2) : "N/A"}
          </h1>
        </div>

        <div>
          <Carousel className="mx-3 mt-5">
            <div className="flex flex-col items-center">
              {/* Image Section */}
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center">
                          <img
                            src="/images/image1.jpg"
                            alt="carousel item"
                            className="w-full"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-8 flex items-center justify-between w-full px-5">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </Carousel>
        </div>

        <div className="mt-4 mx-5">
          <div className="flex flex-col">
            <label className="mb-3 font-bold">Select Size</label>
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  {selectedSize || "Select Size"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Size selection"
                selectionMode="single"
                variant="flat"
                selectedKeys={new Set([selectedSize])} // Ensure the selected size stays active
                onSelectionChange={handleSizeChange}
              >
                {productInfo.sizes && productInfo.sizes.length > 0 ? (
                  productInfo.sizes.map((size) => (
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

        <div className="mt-4 mx-5">
          <div class="relative flex items-center">
            <button
              type="button"
              className="bg-white hover:bg-gray-50 border rounded-s-lg p-3 h-11 focus:outline-none"
              onClick={decrementQuantity}
            >
              <svg
                className="w-3 h-3 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>

            <input
              type="text"
              className="bg-[#f2f2f2] border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
              value={productquantity}
              readOnly
            />

            <button
              type="button"
              className="bg-white hover:bg-gray-50 border rounded-r-lg p-3 h-11 focus:outline-none"
              onClick={incrementQuantity}
            >
              <svg
                className="w-3 h-3 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="btn mt-10 w-[100%] flex flex-col xs:flex-col sm:flex-col md:flex-row items-center justify-center">
          <Button
            color="primary"
            size="lg"
            className=" xs:w-[95%] md:w-[46%] sm:w-[95%] my-5 bg-black text-white transition-all duration-300 transform hover:scale-105 w-[95%]"
            onPress={(event) => {
              dispatch(
                addToCart({
                  _id: productInfo?._id,
                  name: productInfo?.name,
                  quantity: productquantity,
                  image: productInfo?.image,
                  badge: productInfo?.badge,
                  price: productInfo?.price,
                  colors: productInfo?.colors,
                  size: selectedSize,
                })
              );
            }}
          >
            ADD TO CART
          </Button>

          <Button
            color="primary"
            size="lg"
            className="xs:w-[95%]  w-[95%] lg:ml-0 md:w-[46%] sm:w-[95%] xs:ml-0 md:ml-5 sm:ml-0 bg-white border-black text-black border-2 transition-all duration-300 transform hover:scale-105"
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

        <div className="sizeChart mt-10 mb-10 mx-5">
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
      <div className="xl:mt-8 lg:px-10">
        <div>
          <h2 class="title text-center font-manrope font-bold text-2xl md:text-4xl leading-10 mb-4 md:mb-8 text-black  lg:text-left">
            You may also like
          </h2>
        </div>
        <div className="w-full pb-16 pt-5 px-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <Product
                key={product._id}
                _id={product._id}
                img1={`/images/Tshirts/${product.Images[0]}`}
                img2={`/images/Tshirts/${product.Images[1]}`}
                productName={product.ProductName}
                price={product.Price}
                sizes={product.Sizes}
                Description={product.Description}
                Features={product.Features}
                CompositionAndCare={product.CompositionAndCare}
                SizeChart={product.SizeChart}
                Status={product.Status}
                onCartClick={handleCartClick}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddToCart product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ProductDetails;
