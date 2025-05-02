/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import AuthModal from "../AuthModal/AuthModal.jsx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in when component mounts
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setIsOpen(false);
  };

  const handleNavClick = (item) => {
    // Prevent login modal for "Home," "About," "Feedback," "Books," "Notes," and "Question Papers"
    if (!["Home", "About", "Feedback", "Books", "Notes", "Question Papers"].includes(item)) {
      setIsAuthModalOpen(true);
    }
    setIsMenuOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://i.ibb.co/G3HtKFc9/pixelcut-exyuiport.png"
              className="mr-5 h-12"
              alt="Logo"
            />
          </Link>

          {/* Hamburger Menu Button */}
          <div className="flex items-center lg:order-2">
            <button
              onClick={toggleMenu}
              className="lg:hidden inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
              <span className="sr-only">Open main menu</span>
            </button>

            {/* Profile Icon and Auth Buttons - Always visible */}
            <div className="flex items-center">
              {!isAuthenticated ? (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Login / Sign Up
                </button>
              ) : (
                <span className="text-gray-800 mr-2 text-sm hidden md:inline">
                  Welcome, {user?.name || 'User'}
                </span>
              )}
              <div className="relative">
                <img
                  alt="Profile"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  className="inline-block h-8 w-8 rounded-full cursor-pointer object-cover object-center"
                  onClick={toggleDropdown}
                />
                {isOpen && (
                  <ul
                    role="menu"
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  >
                    {isAuthenticated ? (
                      [
                        <li
                          key="profile"
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          My Profile
                        </li>,
                        <li
                          key="settings"
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Settings
                        </li>,
                        <li
                          key="logout"
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      ]
                    ) : (
                      <li
                        key="login"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setIsOpen(false);
                          setIsAuthModalOpen(true);
                        }}
                      >
                        Login / Sign Up
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {["Home", "Books", "Notes", "Question Papers", "About", "Feedback"].map((item) => (
                <li key={item}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-blue-600" : "text-gray-700"
                      } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-600 lg:p-0`
                    }
                    onClick={() => handleNavClick(item)} // Conditional login modal
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(data) => {
          setIsAuthenticated(true);
          setUser(data.user);
          setIsAuthModalOpen(false);
        }}
      />
    </header>
  );
}