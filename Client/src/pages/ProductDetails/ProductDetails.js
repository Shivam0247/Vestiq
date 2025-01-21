import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
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

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["XS"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  const rows = [
    {
      key: "1",
      sizes: "XX-SMALL",
      chest: '42"',
      length: '26.5"',
      shoulders: '19.5"',
    },

    {
      key: "2",
      sizes: "XX-SMALL",
      chest: '42"',
      length: '26.5"',
      shoulders: '19.5"',
    },
    {
      key: "3",
      sizes: "XX-SMALL",
      chest: '42"',
      length: '26.5"',
      shoulders: '19.5"',
    },
    {
      key: "4",
      sizes: "XX-SMALL",
      chest: '42"',
      length: '26.5"',
      shoulders: '19.5"',
    },
    {
      key: "5",
      sizes: "XX-SMALL",
      chest: '42"',
      length: '26.5"',
      shoulders: '19.5"',
    },
    {
      key: "6",
      sizes: "XX-SMALL",
      chest: '42"',
      length: '26.5"',
      shoulders: '19.5"',
    },
    {
      key: "7",
      sizes: "XX-SMALL",
      chest: '42"',
      length: '26.5"',
      shoulders: '19.5"',
    },
  ];

  const columns = [
    {
      key: "sizes",
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
      key: "shoulders",
      label: "SHOULDERS",
    },
  ];

  return (
    <div className="w-full mx-auto flex overflow-hidden">
      <div className="images border-r-1 w-[50%] justify-center flex flex-col ">
        <img src="/images/image1.jpg" alt="" />
        <img src="/images/image1.jpg" alt="" />
        <img src="/images/image1.jpg" alt="" />
        <img src="/images/image1.jpg" alt="" />
      </div>

      <div className="info w-[50%] px-[6%] flex flex-col mt-16">
        <div>
          <h1 className="text-3xl font-extrabold">
            FASHION SCHOOL 2.0 HOODIE [UNISEX]
          </h1>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold mt-5">INR 600.00</h1>
        </div>

        <div className="mt-14">
          <div className="flex flex-col">
            <label className="mb-3 font-bold">Select Size</label>

            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                selectedKeys={selectedKeys}
                selectionMode="single"
                variant="flat"
                onSelectionChange={setSelectedKeys}
              >
                <DropdownItem key="XS">XS</DropdownItem>
                <DropdownItem key="S">S</DropdownItem>
                <DropdownItem key="M">M</DropdownItem>
                <DropdownItem key="L">L</DropdownItem>
                <DropdownItem key="XL">XL</DropdownItem>
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
            THE ORIGINAL JAYWALKING ARTWORK PRINT ON THE FRONT AND BACK, PAIRS
            WELL WITH EVERYTHING.
          </p>
        </div>

        <div className="FEATURES mt-10">
          <h3 className="text-center text-lg font-extrabold">FEATURES</h3>
          <p className="text-center text-md mt-3">OVERSIZED FIT</p>
          <p className="text-center">GRAPHIC PRINT ON THE FRONT AND BACK</p>
          <p className="text-center">MADE IN INDIA</p>
          <p className="text-center">210 GSM</p>
        </div>

        <div className="Care mt-10">
          <h3 className="text-center text-lg font-extrabold">
            COMPOSITION & CARE
          </h3>
          <p className="text-center text-md mt-3">100% COTTON</p>
          <p className="text-center">
            MACHINE WASH INSIDE OUT, DRY & IRON INSIDE OUT.
          </p>
        </div>

        <div className="sizeChart mt-10">
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
