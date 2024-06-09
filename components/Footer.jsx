import { FiGlobe } from 'react-icons/fi';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="fixed left-0 right-0 bottom-0 px-6 sm:px-20 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 border-t-2 border-t-orange-600 dark:border-t-gray-700 text-white dark:text-gray-200 z-50">
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-10 text-center sm:text-left">
        <p className="text-lg font-bold">
          MarketPlace &copy;{new Date().getFullYear()}
        </p>
        <div className="flex space-x-4">
          <Link href="/info/aboutus">
            <span className="hover:underline cursor-pointer">About Us</span>
          </Link>
          <Link href="/info/contact">
            <span className="hover:underline cursor-pointer">Contact</span>
          </Link>
          <Link href="/info/termsofservice">
            <span className="hover:underline cursor-pointer">Terms of Service</span>
          </Link>
          <Link href="/info/privacypolicy">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-lg font-semibold">
        <FiGlobe className="text-2xl" />
        <p>English (US)</p>
      </div>
    </div>
  );
};

export default Footer;
