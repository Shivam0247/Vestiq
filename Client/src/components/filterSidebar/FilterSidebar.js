import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { Input } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import "./FilterSidebar.css";
import { Checkbox } from "@heroui/checkbox";
import { IoClose } from "react-icons/io5";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip } from "@heroui/react";

export default function FilterSidebar({ isOpen, onClose, Category }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["XS"]));
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]); // Persistent state for selected filters

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  // Function to allow only numeric input
  const handleNumericInput = (event) => {
    const value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetch("https://upstrides-server.vercel.app/api/Product/ProductDisplay")
        .then((response) => response.json())
        .then((data) => {
          if (Category === "ALL") {
            setTotalProducts(data.length);
          } else {
            const filteredItems = data.filter(
              (item) => item.Category && item.Category[0] === Category
            );
            setTotalProducts(filteredItems.length);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isOpen, Category]);

  // Handle filter selection
  const handleFilterChange = (filter, isChecked) => {
    if (isChecked) {
      // Add filter to the selected list
      setSelectedFilters((prevFilters) => [...prevFilters, filter]);
    } else {
      // Remove filter from the selected list
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((item) => item !== filter)
      );
    }
  };

  // Handle filter removal via Chip close button
  const handleClose = (filterToRemove) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter !== filterToRemove)
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            duration: 0.3,
          },
          exit: {
            x: 100,
            opacity: 0,
            duration: 0.3,
          },
        },
      }}
      onOpenChange={(open) => {
        if (!open) onClose(); // Close Drawer
      }}
      hideCloseButton={true}
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-row justify-between items-center gap-1 border-b border-gray-200 py-4 px-6">
          <h2 className="text-xl font-semibold text-gray-800">
            FILTER RESULTS
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 p-2 rounded-full transition-all duration-300"
            aria-label="Close Sidebar"
          >
            <IoClose size={24} />
          </button>
        </DrawerHeader>

        <DrawerBody className="py-0 px-0">
          {/* Total Products */}
          <div className="totalProducts border-b-1 px-6 h-14 flex items-center">
            <span className="text-gray-500">{totalProducts} Products</span>
          </div>

          {selectedFilters.length > 0 && (
            <div className="px-6 mt-3">
              {selectedFilters.map((filter, index) => (
                <Chip
                  key={index}
                  variant="flat"
                  onClose={() => handleClose(filter)}
                  className="my-1 mx-1"
                >
                  {filter}
                </Chip>
              ))}
            </div>
          )}

          {/* Filters */}
          <div className="px-6 mt-4">
            <span className="font-bold">FILTER</span>
            <Accordion showDivider={false} selectionMode="multiple">
              <AccordionItem
                key="1"
                aria-label="Availability"
                title="Availability"
              >
                <div className="flex flex-col gap-2">
                  <Checkbox
                    value="In stock"
                    isSelected={selectedFilters.includes("In stock")}
                    onChange={(e) =>
                      handleFilterChange("In stock", e.target.checked)
                    }
                  >
                    In stock (115)
                  </Checkbox>
                  <Checkbox
                    value="Out of stock"
                    isSelected={selectedFilters.includes("Out of stock")}
                    onChange={(e) =>
                      handleFilterChange("Out of stock", e.target.checked)
                    }
                  >
                    Out of stock (87)
                  </Checkbox>
                </div>
              </AccordionItem>

              {/* Price */}
              <AccordionItem key="2" aria-label="Price" title="Price">
                <div className="flex justify-between items-center">
                  <Input
                    labelPlacement="outside"
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">₹</span>
                      </div>
                    }
                    type="text"
                    onInput={handleNumericInput}
                    className="focus:outline-none focus:ring-0 focus:border-gray-300 w-[40%]"
                  />
                  <span>To</span>
                  <Input
                    labelPlacement="outside"
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">₹</span>
                      </div>
                    }
                    type="text"
                    onInput={handleNumericInput}
                    className="focus:outline-none focus:ring-0 focus:border-gray-300 w-[40%]"
                  />
                </div>
              </AccordionItem>

              {/* Product Type */}
              <AccordionItem
                key="3"
                aria-label="Product Type"
                title="Product Type"
              >
                <div className="flex flex-col gap-2">
                  <Checkbox
                    value="T-Shirt"
                    isSelected={selectedFilters.includes("T-Shirt")}
                    onChange={(e) =>
                      handleFilterChange("T-Shirt", e.target.checked)
                    }
                  >
                    T-Shirt
                  </Checkbox>
                  <Checkbox
                    value="Tie dye shirts"
                    isSelected={selectedFilters.includes("Tie dye shirts")}
                    onChange={(e) =>
                      handleFilterChange("Tie dye shirts", e.target.checked)
                    }
                  >
                    Tie dye shirts
                  </Checkbox>
                  <Checkbox
                    value="Sweatshirt"
                    isSelected={selectedFilters.includes("Sweatshirt")}
                    onChange={(e) =>
                      handleFilterChange("Sweatshirt", e.target.checked)
                    }
                  >
                    Sweatshirt
                  </Checkbox>
                  <Checkbox
                    value="Shirt"
                    isSelected={selectedFilters.includes("Shirt")}
                    onChange={(e) =>
                      handleFilterChange("Shirt", e.target.checked)
                    }
                  >
                    Shirt
                  </Checkbox>
                  <Checkbox
                    value="Pants"
                    isSelected={selectedFilters.includes("Pants")}
                    onChange={(e) =>
                      handleFilterChange("Pants", e.target.checked)
                    }
                  >
                    Pants
                  </Checkbox>
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="px-6 mt-4">
            <span className="font-bold">SORT BY</span>
            <div className="mt-3">
              <div className="flex flex-col">
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
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
