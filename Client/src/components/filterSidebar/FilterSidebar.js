import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { Input } from "@heroui/react";
import { Checkbox } from "@heroui/checkbox";
import { IoClose } from "react-icons/io5";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip, Button } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
export default function FilterSidebar({
  isOpen,
  onClose,
  setSelectedFilters,
  selectedFilters,
  Category,
  setSortBy,
}) {
  const [totalProducts, setTotalProducts] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedSort, setSelectedSort] = useState("default");
  useEffect(() => {
    if (isOpen) {
      fetch("https://upstrides-server.vercel.app/api/Product/ProductDisplay")
        .then((response) => response.json())
        .then((data) => {
          const filteredItems =
            Category === "ALL"
              ? data
              : data.filter((item) => item.Category?.[0] === Category);
          setTotalProducts(filteredItems.length);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isOpen, Category]);

  const handleSortChange = (key) => {
    setSelectedSort(key);
    setSortBy(key);
  };

  const handleClose = (filterToRemove, type) => {
    setSelectedFilters((prevFilters) => {
      if (type === "price") {
        return { ...prevFilters, price: null }; // Reset price
      } else if (type === "availability") {
        return {
          ...prevFilters,
          availability: prevFilters.availability.filter(
            (item) => item !== filterToRemove
          ),
        };
      } else if (type === "types") {
        return {
          ...prevFilters,
          types: prevFilters.types.filter((item) => item !== filterToRemove),
        };
      }
      return prevFilters;
    });
  };

  const handleFilterChange = (filter, isChecked) => {
    setSelectedFilters((prev) => ({
      ...prev,
      types: isChecked
        ? [...prev.types, filter]
        : prev.types.filter((item) => item !== filter),
    }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: { opacity: 1, x: 0, duration: 0.3 },
          exit: { x: 100, opacity: 0, duration: 0.3 },
        },
      }}
      onOpenChange={(open) => !open && onClose()}
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
          <div className="totalProducts border-b-1 px-6 h-14 flex items-center">
            <span className="text-gray-500">{totalProducts} Products</span>
          </div>

          {selectedFilters.availability.length > 0 ||
          selectedFilters.types.length > 0 ||
          selectedFilters.price ? (
            <div className="px-6 mt-3 flex flex-wrap gap-2">
              {selectedFilters.availability.map((filter, index) => (
                <Chip
                  key={index}
                  variant="flat"
                  onClose={() => handleClose(filter, "availability")}
                >
                  {filter}
                </Chip>
              ))}

              {selectedFilters.types.map((filter, index) => (
                <Chip
                  key={index}
                  variant="flat"
                  onClose={() => handleClose(filter, "types")}
                >
                  {filter}
                </Chip>
              ))}

              {selectedFilters.price && (
                <Chip
                  key="price"
                  variant="flat"
                  onClose={() => handleClose("price", "price")}
                >
                  INR {selectedFilters.price.min} - INR{" "}
                  {selectedFilters.price.max}
                </Chip>
              )}
            </div>
          ) : null}

          {/* Filters */}
          <div className="px-6 mt-4">
            <span className="font-bold">FILTER</span>
            <Accordion showDivider={false} selectionMode="multiple">
              {/* Availability */}
              <AccordionItem
                key="1"
                aria-label="Availability"
                title="Availability"
              >
                <div className="flex flex-col gap-2">
                  <Checkbox
                    value="In stock"
                    isSelected={selectedFilters.availability.includes(
                      "In stock"
                    )}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        availability: e.target.checked
                          ? [...prev.availability, "In stock"]
                          : prev.availability.filter(
                              (item) => item !== "In stock"
                            ),
                      }))
                    }
                  >
                    {" "}
                    In stock{" "}
                  </Checkbox>

                  <Checkbox
                    value="Out of stock"
                    isSelected={selectedFilters.availability.includes(
                      "Out of stock"
                    )}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        availability: e.target.checked
                          ? [...prev.availability, "Out of stock"]
                          : prev.availability.filter(
                              (item) => item !== "Out of stock"
                            ),
                      }))
                    }
                  >
                    {" "}
                    Out of stock{" "}
                  </Checkbox>
                </div>
              </AccordionItem>

              {/* Price */}
              <AccordionItem key="2" aria-label="Price" title="Price">
                <div className="flex justify-between items-center">
                  <Input
                    labelPlacement="outside"
                    placeholder="Min Price"
                    value={selectedFilters.price?.min || ""}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        price: {
                          ...prev.price,
                          min: Number(e.target.value),
                        },
                      }))
                    }
                  />
                  <span>To</span>
                  <Input
                    labelPlacement="outside"
                    placeholder="Max Price"
                    value={selectedFilters.price?.max || ""}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        price: {
                          ...prev.price,
                          max: Number(e.target.value),
                        },
                      }))
                    }
                  />
                </div>
              </AccordionItem>

              <AccordionItem
                key="3"
                aria-label="Product Type"
                title="Product Type"
              >
                <div className="flex flex-col gap-2">
                  <Checkbox
                    value="T-Shirt"
                    isSelected={selectedFilters.types.includes("T-Shirt")}
                    onChange={(e) =>
                      handleFilterChange(e.target.value, e.target.checked)
                    }
                  >
                    T-Shirt
                  </Checkbox>
                  <Checkbox
                    value="Tie dye shirts"
                    isSelected={selectedFilters.types.includes(
                      "Tie dye shirts"
                    )}
                    onChange={(e) =>
                      handleFilterChange(e.target.value, e.target.checked)
                    }
                  >
                    Tie dye shirts
                  </Checkbox>
                  <Checkbox
                    value="Sweatshirt"
                    isSelected={selectedFilters.types.includes("Sweatshirt")}
                    onChange={(e) =>
                      handleFilterChange(e.target.value, e.target.checked)
                    }
                  >
                    Sweatshirt
                  </Checkbox>
                  <Checkbox
                    value="Shirt"
                    isSelected={selectedFilters.types.includes("Shirt")}
                    onChange={(e) =>
                      handleFilterChange(e.target.value, e.target.checked)
                    }
                  >
                    Shirt
                  </Checkbox>
                  <Checkbox
                    value="Pants"
                    isSelected={selectedFilters.types.includes("Pants")}
                    onChange={(e) =>
                      handleFilterChange(e.target.value, e.target.checked)
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
            <div className="mt-3 w-full">
              <Dropdown className="w-full">
                <DropdownTrigger>
                  <Button className="capitalize w-full" variant="bordered">
                    {selectedSort === "default" ? "Sort By" : selectedSort}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Sorting Options"
                  selectionMode="single"
                  selectedKeys={selectedSort}
                  onSelectionChange={(keys) => handleSortChange(keys.anchorKey)}
                >
                  <DropdownItem key="default">Default</DropdownItem>
                  <DropdownItem key="price-low-high">
                    Price: Low to High
                  </DropdownItem>
                  <DropdownItem key="price-high-low">
                    Price: High to Low
                  </DropdownItem>
                  <DropdownItem key="name-a-z">Name: A to Z</DropdownItem>
                  <DropdownItem key="name-z-a">Name: Z to A</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
