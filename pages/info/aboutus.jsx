import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">About Us</h1>
      <img src="https://i.ibb.co/98Dwyxx/bmarket.webp" alt="About Us" className="w-full sm:w-1/2 h-auto mb-4 mx-auto rounded-lg shadow-md" />
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. 
        Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula. 
        Sed finibus efficitur justo sed viverra. Vivamus a ligula quam. Ut blandit eu leo non suscipit. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.
      </p>
    </div>
  );
};

export default AboutUs;
