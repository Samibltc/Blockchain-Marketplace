import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ImageSlider } from '.';
import { FaStar, FaEthereum } from 'react-icons/fa';
import { formatDate } from '@/utils/helper';
import { getReviews } from '@/services/blockchain';

const Card = ({ product }) => {
  const [meanRating, setMeanRating] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviews(product.id);
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        setMeanRating(totalRating / reviews.length);
      }
    };

    fetchReviews();
  }, [product.id]);

  const truncatedDescription =
    product.description.length > 50
      ? product.description.substring(0, 50) + '...'
      : product.description;

  return (
    <div
      className={`relative shadow-md w-96 text-xl pb-5 rounded-b-2xl mb-10 transition-transform duration-500 ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={'/product/' + product.id} legacyBehavior>
          <a>
            <ImageSlider images={product.images} />
          </a>
        </Link>
        {product.listings === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold rounded-b-2xl z-10">
            OUT OF STOCK
          </div>
        )}
      </div>
      <div className={`px-4 ${product.listings === 0 ? 'opacity-50' : ''}`}>
        <div className="flex justify-between items-start mt-2">
          <Link href={'/product/' + product.id} legacyBehavior>
            <a className="font-semibold capitalize text-[15px] hover:underline cursor-pointer text-black dark:text-white">
              {product.name}
            </a>
          </Link>
          <p className="flex justify-start items-center space-x-2 text-sm text-black dark:text-white">
            <FaStar />
            {meanRating === null ? (
              <span>New</span>
            ) : (
              <span>{meanRating.toFixed(1)}</span>
            )}
          </p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-700 dark:text-gray-300">{formatDate(product.timestamp)}</p>
          <b className="flex justify-start items-center space-x-1 font-semibold text-black dark:text-white">
            <FaEthereum />
            <span>{product.price}</span>
          </b>
        </div>
        <div
          className={`mt-4 text-sm text-gray-700 dark:text-gray-300 transition-opacity duration-300 ease-in-out ${
            isHovered ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'
          }`}
        >
          <p>{truncatedDescription}</p>
          <p className="mt-2">
            <span className="font-semibold">In Stock: </span>{product.listings}
          </p>
          <div className={`mt-4 ${isHovered ? 'block' : 'hidden'}`}>
            <Link href={'/product/' + product.id} legacyBehavior>
              <a
                className={`block w-full text-center py-2 rounded-md ${
                  product.listings === 0
                    ? 'bg-gray-500 text-white'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {product.listings === 0 ? 'Out of Stock' : 'Buy'}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
