import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h1>
      <img src="https://i.ibb.co/FYghCkz/logo.webp" alt="Contact" className="w-full sm:w-1/2 h-auto mb-4 mx-auto rounded-lg shadow-md" />
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. 
        Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula. 
        Sed finibus efficitur justo sed viverra. Vivamus a ligula quam. Ut blandit eu leo non suscipit. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-gray-900 dark:text-gray-100">Get in Touch</h2>
      <form className="flex flex-col space-y-4">
        <input type="text" placeholder="Your Name" className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
        <input type="email" placeholder="Your Email" className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
        <textarea placeholder="Your Message" className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600" rows="5"></textarea>
        <button type="submit" className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-800">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
