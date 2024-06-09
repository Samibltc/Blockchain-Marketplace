# Blockchain Marketplace

Welcome to the Blockchain Marketplace project. This decentralized application (DApp) allows users to buy and sell products using blockchain technology, ensuring secure and transparent transactions. 

## Demo

Watch the [Demo Video](https://drive.google.com/file/d/1KoLcHG0mWA0hOpxnwjEbkx2DC6BLdh9r/view) for an overview of the project.

## Features

- **Decentralized Marketplace**: Users can list, browse, and purchase products securely.
- **Smart Contracts**: Transactions are handled by Ethereum smart contracts, ensuring trust and transparency.
- **User Authentication**: Users authenticate using their Ethereum wallets.
- **Product Management**: Sellers can add, update, and delete product listings.
- **Purchase Management**: Buyers can approve and refund purchases.
- **Review System**: Buyers can leave reviews and ratings for purchased products.
- **Dark Mode**: The application supports a dark mode for better user experience.

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Blockchain**: Ethereum, Solidity, ethers.js
- **Backend**: Node.js
- **Smart Contracts**: OpenZeppelin

## Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/Samibltc/Blockchain-Marketplace.git
    cd Blockchain-Marketplace
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Compile Smart Contracts**
    ```sh
    npx hardhat compile
    ```

4. **Deploy Smart Contracts**
    ```sh
    npx hardhat run scripts/deploy.js --network YOUR_NETWORK
    ```

5. **Set up environment variables**

    Create a `.env` file in the root directory and add your environment variables:
    ```sh
    NEXT_PUBLIC_RPC_URL=YOUR_RPC_URL
    NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
    ```

6. **Run the application**
    ```sh
    npm run dev
    ```

7. **Run tests**
    ```sh
    npx hardhat test
    ```

## Usage

- **Browse Products**: Visit the homepage to browse available products.
- **View Product Details**: Click on a product to view detailed information.
- **Add Product**: As a seller, navigate to the "Sell Products" page to list a new product.
- **Manage Purchases**: Visit the "Purchases" page to view and manage your transactions.

## File Structure

- `contracts/`: Solidity smart contracts.
- `scripts/`: Deployment scripts.
- `pages/`: Next.js pages.
- `components/`: React components.
- `services/`: Blockchain interaction logic.
- `store/`: Redux store setup.

## Contributing

1. **Fork the repository**
2. **Create a new branch**
    ```sh
    git checkout -b feature/YourFeature
    ```
3. **Commit your changes**
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**
    ```sh
    git push origin feature/YourFeature
    ```
5. **Open a pull request**

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Contact

For any questions or feedback, please open an issue on the [GitHub repository](https://github.com/Samibltc/Blockchain-Marketplace).
