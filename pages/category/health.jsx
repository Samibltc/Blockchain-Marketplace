import React, { useEffect, useState } from 'react';
import { getProducts } from '@/services/blockchain';
import Card from '@/components/Card';
import Category from '@/components/Category';

const Health = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();
      const healthProducts = allProducts.filter(product => product.category === 'Health');
      setProducts(healthProducts);
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Category />
      <div className="py-8 px-14 flex justify-center flex-wrap space-x-4 w-full">
        {sortedProducts.map(product => (
          <Card key={product.id} product={product} />
        ))}
        {products.length < 1 && <span className="text-gray-700 dark:text-gray-300">No Products Yet!</span>}
      </div>
    </div>
  );
};

export default Health;
