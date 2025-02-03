import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const userEmail = Cookies.get("userEmail");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  const [text, setText] = useState([
    "U",
    "P",
    "S",
    "T",
    "R",
    "I",
    "D",
    "E",
    "S",
  ]);
  const shuffleIntervalRef = useRef(null);
  const footerRef = useRef(null);
  const footerTextRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  function getRandomCharacter() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ;!@#$%^&*(){}[]Ø";
    return chars[Math.floor(Math.random() * chars.length)];
  }

  const handleMouseEnter = () => {
    let count = 0;

    shuffleIntervalRef.current = setInterval(() => {
      count++;
      setText((text) => text.map(() => getRandomCharacter()));
      if (count >= 30) {
        setText(["U", "P", "S", "T", "R", "I", "D", "E", "S"]);
        clearInterval(shuffleIntervalRef.current);
        count = 0;
      }
    }, 10);
  };

  const handleMouseLeave = () => {
    setText(["U", "P", "S", "T", "R", "I", "D", "E", "S"]);
    clearInterval(shuffleIntervalRef.current);
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === footerRef.current)
          setIsVisible(entry.isIntersecting);
        else if (entry.target === footerTextRef.current)
          setIsTextVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    if (footerRef.current) observer.observe(footerRef.current);
    if (footerTextRef.current) observer.observe(footerTextRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
      if (footerTextRef.current) observer.unobserve(footerTextRef.current);
    };
  }, []);
  return (
    <div className="w-full border-t-0 py-20">
      <div className="lg:grid lg:grid-cols-6 xl:grid-cols-6 px-4 gap-10 sm:mb-5 xs:mb-5 flex justify-between">
        <div className="col-span-4 hidden lg:block">
          <FooterListTitle title=" More about Up Strides" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%] text-lightText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint
              ab ullam, numquam nesciunt in.
            </p>
            <ul className="flex items-center gap-2">
              <a
                href="https://www.youtube.com/@reactjsBD"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaYoutube />
                </li>
              </a>
              <a
                href="https://github.com/noorjsdivs"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
              <a
                href="https://www.facebook.com/Noorlalu143/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/in/noor-mohammad-ab2245193/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div>
          <FooterListTitle title="Quick links" />
          <ul className="flex flex-col gap-2">
            <Link to="/contact">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Contact Us
              </li>
            </Link>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Returns and Refunds
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Policies
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Delivery
            </li>
          </ul>
        </div>
        <div className="text-right lg:text-left">
          <FooterListTitle title="Your account" />
          <ul className="flex flex-col gap-2">
            <Link to={userEmail ? "/account" : "/signin"}>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Profile
              </li>
            </Link>
            <Link to={userEmail ? "/account" : "/signin"}>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Orders
              </li>
            </Link>
            <Link to={userEmail ? "/account" : "/signin"}>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Addresses
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div
        className="flex justify-betweeen items-center w-full flex-col overflow-hidden h-full pb-5"
        ref={footerTextRef}
      >
        <span
          className={`font-bold leading-none sm:mb-[-3vw] text-[18vw] z-[1] hover:text-lightText transition-all 
                    duration-500
                    overflow-hidden ${
                      isTextVisible ? " transformVisible" : "transformInvisible"
                    }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text.map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </span>
      </div>

      <span className="text-sm text-lightText sm:mb-[-1vw] text-center lowercase block w-full mt-10">
        Copyright 2025 | Up Strides | All Rights Reserved
      </span>
    </div>
  );
};

export default Footer;
