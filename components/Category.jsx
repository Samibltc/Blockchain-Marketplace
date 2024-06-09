import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaComputer } from 'react-icons/fa6';
import { FaTshirt } from 'react-icons/fa';
import { MdSportsBasketball } from 'react-icons/md';
import { GiLipstick } from 'react-icons/gi';
import { PiSneakerFill } from 'react-icons/pi';

const Category = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className="flex justify-center space-x-5 sm:space-x-14 p-4 px-4 border-b-2 border-b-orange-200 text-orange-600 bg-gray-100 dark:bg-gray-900 dark:text-orange-400 animate-fadeIn">
      <Link href="/category/electronics">
        <div className={`flex flex-col items-center transition-transform transform hover:scale-110 hover:text-orange-800 dark:hover:text-orange-300 border-b-2 pb-2 cursor-pointer ${isActive('/category/electronics') ? 'text-orange-800 dark:text-orange-300 border-orange-800 dark:border-orange-300' : 'border-transparent'}`}>
          <FaComputer className="text-3xl text-orange-600 dark:text-orange-400" />
          Electronics
        </div>
      </Link>
      <Link href="/category/clothing">
        <div className={`flex flex-col items-center transition-transform transform hover:scale-110 hover:text-orange-800 dark:hover:text-orange-300 border-b-2 pb-2 cursor-pointer ${isActive('/category/clothing') ? 'text-orange-800 dark:text-orange-300 border-orange-800 dark:border-orange-300' : 'border-transparent'}`}>
          <FaTshirt className="text-3xl text-orange-600 dark:text-orange-400" />
          Clothing
        </div>
      </Link>
      <Link href="/category/sports">
        <div className={`flex flex-col items-center transition-transform transform hover:scale-110 hover:text-orange-800 dark:hover:text-orange-300 border-b-2 pb-2 cursor-pointer ${isActive('/category/sports') ? 'text-orange-800 dark:text-orange-300 border-orange-800 dark:border-orange-300' : 'border-transparent'}`}>
          <MdSportsBasketball className="text-3xl text-orange-600 dark:text-orange-400" />
          Sports
        </div>
      </Link>
      <Link href="/category/health">
        <div className={`flex flex-col items-center transition-transform transform hover:scale-110 hover:text-orange-800 dark:hover:text-orange-300 border-b-2 pb-2 cursor-pointer ${isActive('/category/health') ? 'text-orange-800 dark:text-orange-300 border-orange-800 dark:border-orange-300' : 'border-transparent'}`}>
          <GiLipstick className="text-3xl text-orange-600 dark:text-orange-400" />
          Health
        </div>
      </Link>
      <Link href="/category/shoes">
        <div className={`flex flex-col items-center transition-transform transform hover:scale-110 hover:text-orange-800 dark:hover:text-orange-300 border-b-2 pb-2 cursor-pointer ${isActive('/category/shoes') ? 'text-orange-800 dark:text-orange-300 border-orange-800 dark:border-orange-300' : 'border-transparent'}`}>
          <PiSneakerFill className="text-3xl text-orange-600 dark:text-orange-400" />
          Shoes
        </div>
      </Link>
    </div>
  );
};

export default Category;
