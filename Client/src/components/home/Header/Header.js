import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import logo_trans_black from "../../../assets/images/logo_trans_black.png";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Header = ({ onSidebarOpen }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();
  const products = useSelector((state) => state.orebiReducer.products);

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full h-20 bg-white top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-5 mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image
                className="lg:w-[14rem] sm:w-[9rem] md:w-[12rem] w-[7rem] object-cover"
                imgSrc="/UPSTRIDES.png"
              />
            </div>
          </Link>
          <div className="flex">
            <Link to="/cart" className="flex md:hidden">
              <div className="w-16 h-[70px] flex flex-col gap-1 justify-center items-center overflow-x-hidden group cursor-pointer relative mr-1">
                <div className="flex justify-center items-center mt-2">
                  <i class="fi fi-rr-shopping-cart-add text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200 "></i>
                  <i class="fi fi-rr-shopping-cart-add text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200"></i>
                </div>
                {products.length > 0 && (
                  <p className="absolute top-4 right-3 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {products.length}
                  </p>
                )}
              </div>
            </Link>

            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center w-auto z-50 p-0 gap-2"
            >
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={onSidebarOpen} // Trigger Sidebar open
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </motion.ul>
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
