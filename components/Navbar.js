"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosCart } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import MenuList from "./ui/MenuList";
import Cart from "./Cart";
import ButtonSquare from "./ui/ButtonSquare";
import Banner from "./Banner";
import { ProductContext } from "@/context/GlobalState";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const { cart } = ProductContext();

  const calculateTotalItems = (cart) => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  useEffect(() => {
    let total = calculateTotalItems(cart);
    setTotalItems(total);
  }, [cart]);

  return (
    <header className="w-full h-auto">
      <Banner />
      <nav className="w-full lg:top-8 top-0 shadow z-40 fixed bg-white py-3 lg:px-10 md:px-7 px-2 flex justify-between transition-all">
        <div className="">
          <Link href={"/"}>
            <Image
              src="/logo/logo.jpg"
              width={40}
              height={40}
              alt="Logo"
              priority
              style={{borderRadius: 10}}
            />
          </Link>
        </div>

        <MenuList className="w-10/12 items-center justify-end gap-7 hidden lg:flex" />

        <div className="flex space-x-3">
          <ButtonSquare
            className="bg-primary  relative bg-button-wave shadow hover:opacity-80 transition-opacity"
            onClick={() => setShowCart(true)}
          >
            <div className="w-6 h-6 bg-white flex items-center justify-center rounded-full absolute -top-2 -right-3 text-primary text-sm shadow-md font-bold">
              {totalItems}
            </div>
            <IoIosCart className="text-2xl text-white" />
          </ButtonSquare>
          <ButtonSquare
            className={`lg:hidden ${showMenu ? "bg-primary" : "bg-gray-200"}`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <FiMenu className={`text-xl ${showMenu ? "text-white" : ""}`} />
          </ButtonSquare>
        </div>
      </nav>

      <MenuList
        className={`fixed z-30 py-10 top-0 lg:hidden bg-white flex flex-col space-y-10 w-full px-5 shadow-md transition-transform duration-200 ease-linear ${
          showMenu ? "top-16" : "-translate-y-full"
        }`}
      />

      <Cart setShowCart={setShowCart} showCart={showCart} />
    </header>
  );
}
