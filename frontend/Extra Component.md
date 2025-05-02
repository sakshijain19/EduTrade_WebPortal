```js
{isOpen && (
  <ul
    role="menu"
    className="absolute right-0 z-10 min-w-[180px] max-h-[300px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none"
  >
    <li
      role="menuitem"
      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      onClick={() => setIsOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-slate-400"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 10 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-slate-800 font-medium ml-2">My Profile</p>
    </li>

    <li
      role="menuitem"
      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      onClick={() => setIsOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-slate-400"
      >
        <path d="M8.157 4.818a2.086 2.086 0 1 1 3.686 0l3.74 6.885a2.086 2.086 0 0 1-1.843 3.09H6.26a2.086 2.086 0 0 1-1.843-3.09l3.74-6.885ZM10 3a3.333 3.333 0 0 0-2.94 1.757L3.32 11.643A3.333 3.333 0 0 0 6.261 16h7.478a3.333 3.333 0 0 0 2.94-4.357l-3.74-6.885A3.333 3.333 0 0 0 10 3Zm0 9.167a1.167 1.167 0 1 0 0-2.333 1.167 1.167 0 0 0 0 2.333Z" />
      </svg>
      <p className="text-slate-800 font-medium ml-2">Security</p>
    </li>

    <li
      role="menuitem"
      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      onClick={() => setIsOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-slate-400"
      >
        <path
          fillRule="evenodd"
          d="M7 5a3 3 0 0 1 6 0v1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2V5ZM6 9v6h8V9H6Zm2.5-4a1.5 1.5 0 0 1 3 0v1h-3V5Z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-slate-800 font-medium ml-2">Password</p>
    </li>

    <li
      role="menuitem"
      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      onClick={() => setIsOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-slate-400"
      >
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM8.854 7.854a.5.5 0 0 0 0-.708l-1.5-1.5a.5.5 0 1 0-.708.708L7.293 7.5 6.646 8.146a.5.5 0 0 0 .708.708l1.5-1.5Zm3.292 4.292a.5.5 0 0 0 0-.708l-1.5-1.5a.5.5 0 0 0-.708.708L10.293 11.5l-.647.646a.5.5 0 0 0 .708.708l1.5-1.5Z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-slate-800 font-medium ml-2">Settings</p>
    </li>

    <li
      role="menuitem"
      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      onClick={() => setIsOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-slate-400"
      >
        <path
          fillRule="evenodd"
          d="M16.707 13.293a1 1 0 0 1-1.414 1.414L10 9.414 4.707 14.707a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5Z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-slate-800 font-medium ml-2">Logout</p>
    </li>
  </ul>
)}
```




```js
/* eslint-disable react/no-unescaped-entities */
 // import React from "react";

  // const Header = () => {
  //   return (
  //     <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
  //       <div className="text-center mb-12">
  //         <div className="grid  place-items-center sm:mt-1">
  //               <img className="sm:w-96 w-48" src="src\Components\Images\Logo.png" alt="Logo" />
  //         </div> 
  //         {/* <h1 className="text-5xl font-bold text-gray-800 mb-4">EduTrade</h1> */}
  //         <p className="text-2xl font-semibold text-gray-600">
  //           Connecting Students, Empowering Exchanges
  //         </p>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
  //   {/* Buy Section */}
  //   <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 cursor-pointer">
  //     <h2 className="text-2xl font-semibold text-gray-800 mb-4 transition duration-300">Buy</h2>
  //     <p className="text-gray-600 transition duration-300 ">
  //       Find and purchase educational resources from others.
  //     </p>
  //   </div>

  //   {/* Rent Section */}
  //   <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 cursor-pointer">
  //     <h2 className="text-2xl font-semibold text-gray-800 mb-4 transition duration-300">Rent</h2>
  //     <p className="text-gray-600 transition duration-300 ">
  //       Rent out or borrow resources for temporary use.
  //     </p>
  //   </div>

  //   {/* Sell Section */}
  //   <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 cursor-pointer">
  //     <h2 className="text-2xl font-semibold text-gray-800 mb-4 transition duration-300">Sell</h2>
  //     <p className="text-gray-600 transition duration-300 ">
  //       Sell your educational materials to others.
  //     </p>
  //   </div>
  // </div>

  //     </main>
  //   );
  // };

  // export default Header;
```