import { useState, useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdWbSunny, MdNightsStay } from "react-icons/md";
import Link from 'next/link';
import { ConnectBtn } from '.';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="flex justify-between items-center p-4 px-8 sm:px-10 md:px-14 border-b-2 border-b-orange-200 w-full animate-fadeIn bg-white dark:bg-gray-900">
      <Link href={'/'} legacyBehavior>
        <a className="flex items-center text-xl" style={{ width: '25%' }}>
          <img
            src="https://i.ibb.co/FYghCkz/logo.webp"
            alt="MarketPlace Logo"
            className="w-30 h-20 mr-5 rounded-lg"
          />
          <span className="text-orange-600 dark:text-orange-400 font-semibold font-sans">Blockchain MarketPlace</span>
        </a>
      </Link>
      <div className="flex items-center space-x-6">
        <ButtonGroup />
        <SocialLinks />
        <div
          onClick={toggleDarkMode}
          className="relative flex items-center cursor-pointer"
        >
          <div className={`w-20 h-8 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} flex items-center p-1 transition duration-300`}>
            <div className={`w-6 h-6 rounded-full ${darkMode ? 'translate-x-12 bg-yellow-500' : 'translate-x-0 bg-gray-800'} flex items-center justify-center transform transition-transform duration-300`}>
              {darkMode ? <MdNightsStay className="text-white" /> : <MdWbSunny className="text-yellow-500" />}
            </div>
          </div>
          <span className={`absolute left-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}></span>
          <span className={`absolute right-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}></span>
        </div>
        <ConnectBtn />
      </div>
    </header>
  );
}

const ButtonGroup = () => {
  return (
    <div className="md:flex items-center justify-center border-orange-300 border overflow-hidden rounded-full cursor-pointer">
      <div className="inline-flex" role="group">
        <Link href={'/product/add'} legacyBehavior>
          <a>
            <button
              type="button"
              className="
                px-5
                py-3
                border-x border-orange-300
                text-orange-600 dark:text-orange-400
                font-medium
                text-sm
                leading-tight
                hover:bg-orange-100 dark:hover:bg-orange-700
                focus:outline-none focus:ring-0
                transition-all
                duration-150
                ease-in-out
              "
            >
              Sell Products
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}

const SocialLinks = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href={'https://twitter.com'} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-orange-600 dark:text-orange-400 hover:text-orange-500 transition duration-150 ease-in-out" size={24} />
        </a>
      </Link>
      <Link href={'https://www.linkedin.com'} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-orange-600 dark:text-orange-400 hover:text-orange-500 transition duration-150 ease-in-out" size={24} />
        </a>
      </Link>
      <Link href={'https://www.instagram.com'} legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-orange-600 dark:text-orange-400 hover:text-orange-500 transition duration-150 ease-in-out" size={24} />
        </a>
      </Link>
    </div>
  );
}

export default Header;