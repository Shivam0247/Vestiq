import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Sidebar from "./components/Sidebar/Sidebar";
import LimitedStock from "./components/LimitedStock/LimitedStock";
import LTD_ED from "./components/LTD_ED/LTD_ED";
import OTP from "./pages/Account/otp";
import Account from "./components/Account/Account";
import Checkout from "./components/Checkout/Checkout";

const Layout = ({ onSidebarOpen, isSidebarOpen, closeSidebar }) => {
  const location = useLocation();

  // Check if the current route is "/account"
  const hideFooter = location.pathname === "/account";

  return (
    <div>
      <Header onSidebarOpen={onSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      {/* Conditionally render Footer */}
      {!hideFooter && (
        <>
          <Footer />
          {/* <FooterBottom /> */}
        </>
      )}
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <Layout
              onSidebarOpen={openSidebar}
              isSidebarOpen={isSidebarOpen}
              closeSidebar={closeSidebar}
            />
          }
        >
          <Route path="/" index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/limitedstock" element={<LimitedStock />} />
          <Route path="/LTD_ED" element={<LTD_ED />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/OTP/:email" element={<OTP />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Route>
    )
  );

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
