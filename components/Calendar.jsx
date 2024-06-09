import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaEthereum } from 'react-icons/fa';
import { buyProduct } from '@/services/blockchain';

const Calendar = ({ product, timestamps }) => {
  const [quantity, setQuantity] = useState(1);
  const [localListings, setLocalListings] = useState(product?.listings || 0);
  const { securityFee } = useSelector((states) => states.globalStates);

  useEffect(() => {
    // Update localListings whenever product.listings changes
    setLocalListings(product?.listings || 0);
  }, [product?.listings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestampArray = [];
    if (quantity <= 0 || quantity > localListings) return;

    for (let i = 0; i < quantity; i++) {
      timestampArray.push(Date.now()); // or any timestamp logic you need
    }

    const params = {
      aid: product?.id,
      timestamps: timestampArray,
      amount:
        product?.price * timestampArray.length +
        (product?.price * timestampArray.length * securityFee) / 100,
    };

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await buyProduct(params)
          .then(async () => {
            setQuantity(1);
            setLocalListings(localListings - quantity); // Update local stock
            resolve();
          })
          .catch(() => reject());
      }),
      {
        pending: 'Approve transaction...',
        success: 'Purchase successful',
        error: 'Encountered error',
      }
    );
  };

  // Generate a range of options for the quantity select element, limited by product stock
  const quantityOptions = Array.from(
    { length: localListings },
    (_, index) => index + 1
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-[25rem] border-[0.1px] p-6 border-gray-400 dark:border-gray-600 rounded-lg shadow-lg flex flex-col space-y-4 bg-white dark:bg-gray-800"
    >
      <div className="flex justify-between">
        <div className="flex justify-center items-center">
          <FaEthereum className="text-lg text-gray-500 dark:text-gray-300" />
          <span className="text-lg text-gray-500 dark:text-gray-300">{product?.price}</span>
        </div>
      </div>

      {localListings > 0 ? (
        <>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="rounded-lg w-full border border-gray-400 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {quantityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="p-2 border-none bg-gradient-to-l from-pink-600 to-gray-600 text-white w-full rounded-md focus:outline-none focus:ring-0"
          >
            Buy
          </button>
        </>
      ) : (
        <div className="text-center text-red-500 font-bold">Sold Out</div>
      )}

      <Link href={`/product/purchases/${product?.id}`} className="text-pink-500 dark:text-pink-400">
        Check your purchases
      </Link>
    </form>
  );
};

export default Calendar;
