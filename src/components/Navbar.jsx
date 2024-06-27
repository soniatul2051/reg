import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          Registration App
        </div>
        {/* Responsive menu button for smaller screens */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 6H18V8H6V6ZM6 11H18V13H6V11ZM6 16H18V18H6V16Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Dropdown menu for smaller screens */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 inset-x-0 bg-gray-800 z-10">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/coordinator-registration"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
              >
                Coordinator Registration
              </Link>
              <Link
                to="/school-registration"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
              >
                School Registration
              </Link>
              <Link
                to="/student-registration"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
              >
                Student Registration
              </Link>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
              >
                Login
              </Link>
              {/* <Link
                to="/state-district-selection"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white"
              >
                State-District Selection
              </Link> */}
            </div>
          </div>
        )}
        {/* Desktop navigation links */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link
            to="/coordinator-registration"
            className="text-gray-300 hover:text-white"
          >
            Coordinator Registration
          </Link>
          <Link
            to="/school-registration"
            className="text-gray-300 hover:text-white"
          >
            School Registration
          </Link>
          <Link
            to="/student-registration"
            className="text-gray-300 hover:text-white"
          >
            Student Registration
          </Link>
          <Link
            to="/login"
            className="text-gray-300 hover:text-white"
          >
            Login
          </Link>
          {/* <Link
            to="/state-district-selection"
            className="text-gray-300 hover:text-white"
          >
            State-District Selection
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
