import React, { Fragment, useContext, useState } from "react"; 
import myContext from "../../context/data/myContext";
import { Link } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(myContext);
  const cartItems = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);

  const { mode, toggleMode } = context;

  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  return (
    <div className="bg-white sticky top-0 z-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                {/* Mobile Menu */}
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                {/* Links */}
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link
                    to={"/"}
                    className="text-sm font-medium text-gray-900"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    All Products
                  </Link>
                  <div className="flow-root">
                    <Link
                      to={"/order"}
                      style={{ color: mode === "dark" ? "white" : "" }}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Order
                    </Link>
                  </div>
                  <div className="flow-root">
                    {user?.user?.email === "Ramji@gmail.com" ? (
                      <Link
                        to={"/dashboard"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        admin
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  {user ? (
                    <div className="flow-root">
                      <a
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        onClick={logout}
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Logout
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flow-root">
                    <Link
                      to={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    >
                      <FaRegUserCircle className="inline-block w-10 h-10 rounded-full" />
                    </Link>
                  </div>
                </div>

                {/* Currency Section */}
                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-base font-medium text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      INDIA
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Menu */}
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
              style={{
                backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* Logo Section */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <Link to={"/"} className="flex items-center">
                <h1
                  className="text-2xl font-bold text-black px-2 py-1 rounded whitespace-nowrap"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Veshleshan Store
                </h1>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <Link
                to={"/"}
                className="text-sm font-medium text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                All Products
              </Link>
              <Link
                to={"/order"}
                className="text-sm font-medium text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Order
              </Link>
              {user?.user?.email === "Ramji@gmail.com" ? (
                <Link
                  to={"/dashboard"}
                  className="text-sm font-medium text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Admin
                </Link>
              ) : (
                ""
              )}
              {user ? (
                <a
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={logout}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Logout
                </a>
              ) : (
                ""
              )}
            </div>

            {/* Dark Mode & Cart */}
            <div className="flex items-center">
              <button onClick={toggleMode} className="lg:ml-4">
                {mode === "light" ? (
                  <FiSun className="" size={30} />
                ) : (
                  <BsFillCloudSunFill size={30} />
                )}
              </button>
              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  to={"/cart"}
                  className="group -m-2 flex items-center p-2"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>

                  <span
                    className="ml-2 text-sm font-medium text-gray-700 group-"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {cartItems.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
