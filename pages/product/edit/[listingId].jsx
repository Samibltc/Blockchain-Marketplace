import { useState } from 'react';
import { truncate } from '@/utils/helper';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';
import { getProduct, updateProduct } from '@/services/blockchain';

export default function Edit({ product }) {
  const { address } = useAccount();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [location, setLocation] = useState(product.location);
  const [listings, setListings] = useState(product.listings);
  const [images, setImages] = useState('');
  const [price, setPrice] = useState(product.price);
  const [links, setLinks] = useState(product.images);
  const navigate = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || !description || !listings || links.length !== 5 || !price) return;

    const params = {
      ...product,
      name,
      description,
      location,
      listings,
      images: links.slice(0, 5).join(','),
      price,
    };

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await updateProduct(params)
          .then(async () => {
            navigate.push('/product/' + product.id);
            resolve();
          })
          .catch(() => reject());
      }),
      {
        pending: 'Approve transaction...',
        success: 'Product updated successfully',
        error: 'Encountered error',
      }
    );
  };

  const addImage = (e) => {
    e.preventDefault();
    if (links.length !== 5) {
      setLinks((prevState) => [...prevState, images]);
    }
    setImages('');
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    links.splice(index, 1);
    setLinks(() => [...links]);
  };

  return (
    <div className="h-screen flex justify-center mx-auto bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="w-11/12 md:w-2/5 h-7/12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-center items-center">
            <p className="font-semibold text-black dark:text-white">Edit Product</p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 dark:border-gray-600 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 dark:text-gray-300 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="name"
              placeholder="Product Name "
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 dark:border-gray-600 p-2 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 dark:text-gray-300 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (ETH)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-300 dark:border-gray-600 p-2 rounded-xl mt-5">
            <input
              className="block flex-1 text-sm
                text-slate-500 dark:text-gray-300 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="url"
              name="images"
              placeholder="Images"
              onChange={(e) => setImages(e.target.value)}
              value={images}
            />

            {links.length !== 5 && (
              <button
                onClick={(e) => addImage(e)}
                type="button"
                className="p-2 bg-[#ff385c] text-white rounded-full text-sm"
              >
                Add image link
              </button>
            )}
          </div>

          <div
            className="flex flex-row justify-start items-center
          rounded-xl mt-5 space-x-1 flex-wrap"
          >
            {links.map((link, i) => (
              <div
                key={i}
                className="p-2 rounded-full text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 font-semibold
                flex items-center w-max cursor-pointer active:bg-gray-300 dark:active:bg-gray-600
                transition duration-300 ease space-x-2 text-xs"
              >
                <span>{truncate(link, 4, 4, 11)}</span>
                <button
                  onClick={(e) => removeImage(e, i)}
                  type="button"
                  className="bg-transparent hover focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 dark:border-gray-600 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 dark:text-gray-300 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="location"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 dark:border-gray-600 p-2 rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm
                text-slate-500 dark:text-gray-300 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="listings"
              placeholder="Number of listings"
              onChange={(e) => setListings(e.target.value)}
              value={listings}
              required
            />
          </div>

          <div
            className="flex flex-row justify-between items-center
          border border-gray-300 dark:border-gray-600 p-2 rounded-xl mt-5"
          >
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 dark:text-gray-300 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Product Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`flex flex-row justify-center items-center
            w-full text-white text-md bg-[#ff385c]
            py-2 px-5 rounded-full drop-shadow-xl hover:bg-white
            border-transparent border
            hover:hover:text-[#ff385c]
            hover:border-[#ff385c]
            mt-5 transition-all duration-500 ease-in-out ${
              !address ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!address}
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { listingId } = context.query;
  const product = await getProduct(listingId);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
