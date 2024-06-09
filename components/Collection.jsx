import { useState } from 'react';
import { Card } from '.';

const Collection = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sort products by date added and move out-of-stock products to the end
  const sortedProducts = products.sort((a, b) => {
    if (a.listings === 0 && b.listings !== 0) {
      return 1; // a is out of stock, move to end
    } else if (a.listings !== 0 && b.listings === 0) {
      return -1; // b is out of stock, move to end
    } else {
      return new Date(b.timestamp) - new Date(a.timestamp); // Sort by date added
    }
  });

  // Calculate the products to be displayed on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="py-8 px-14 flex flex-col items-center w-full bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-center flex-wrap space-x-4 w-full">
        {currentProducts.map((listing, i) => (
          <Card product={listing} key={i} />
        ))}
        {products.length < 1 && <span className="text-gray-700 dark:text-gray-300">No Products Yet!</span>}
      </div>

      <div className="mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`px-3 py-1 mx-1 border rounded-md ${
              currentPage === index + 1
                ? 'bg-orange-500 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Collection;
