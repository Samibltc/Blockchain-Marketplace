import { ethers } from 'ethers'
import { store } from '@/store'
import { globalActions } from '@/store/globalSlices'
import address from '@/contracts/contractAddress.json'
import dappBnbAbi from '@/artifacts/contracts/DappBnb.sol/DappBnb.json'

const toWei = (num) => ethers.parseEther(num.toString())
const fromWei = (num) => ethers.formatEther(num)

let ethereum, tx

if (typeof window !== 'undefined') ethereum = window.ethereum
const { setPurchases, setTimestamps, setReviews } = globalActions

const getEthereumContracts = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })

  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const contracts = new ethers.Contract(address.dappBnbContract, dappBnbAbi.abi, signer)

    return contracts
  } else {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
    const wallet = ethers.Wallet.createRandom()
    const signer = wallet.connect(provider)
    const contracts = new ethers.Contract(address.dappBnbContract, dappBnbAbi.abi, signer)

    return contracts
  }
}

const getProducts = async () => {
  const contract = await getEthereumContracts()
  const products = await contract.getProducts()
  return structureProducts(products)
}

const getProduct = async (id) => {
  const contract = await getEthereumContracts()
  const product = await contract.getProduct(id)
  return structureProducts([product])[0]
}

const getPurchases = async (id) => {
  const contract = await getEthereumContracts()
  const purchases = await contract.getPurchases(id)
  return structuredPurchases(purchases)
}

const getQualifiedReviewers = async (id) => {
  const contract = await getEthereumContracts()
  const purchases = await contract.getQualifiedReviewers(id)
  return purchases
}

const getReviews = async (id) => {
  const contract = await getEthereumContracts()
  const reviewers = await contract.getReviews(id)
  return structuredReviews(reviewers)
}

const getPurchasedDates = async (id) => {
  const contract = await getEthereumContracts()
  const purchases = await contract.getUnavailableDates(id)
  const timestamps = purchases.map((timestamp) => Number(timestamp))
  return timestamps
}

const getSecurityFee = async () => {
  const contract = await getEthereumContracts()
  const fee = await contract.securityFee()
  return Number(fee)
}

const createProduct = async (product) => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.createProduct(
      product.name,
      product.description,
      product.location,
      product.images,
      product.quantity,
      toWei(product.price),
      product.category // Include category
    )
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const updateProduct = async (product) => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.updateProduct(
      product.id,
      product.name,
      product.description,
      product.location,
      product.images,
      product.listings,
      toWei(product.price),
      product.category // Include category
    )
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const deleteProduct = async (aid) => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.deleteProduct(aid)
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const buyProduct = async ({ aid, timestamps, amount }) => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.buyProduct(aid, timestamps, {
      value: toWei(amount),
    })

    await tx.wait()
    const purchasedDates = await getPurchasedDates(aid)

    store.dispatch(setTimestamps(purchasedDates))
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const approveProduct = async (aid, timestamps) => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.approveProduct(aid, timestamps)

    await tx.wait()
    const purchases = await getPurchases(aid)

    store.dispatch(setPurchases(purchases))
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const refundPurchase = async (aid, purchaseId) => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.refundPurchase(aid, purchaseId)

    await tx.wait()
    const purchases = await getPurchases(aid)

    store.dispatch(setPurchases(purchases))
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const addReview = async (aid, comment, rating) => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.addReview(aid, comment, rating)

    await tx.wait()
    const reviews = await getReviews(aid)

    store.dispatch(setReviews(reviews))
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const structureProducts = (products) =>
  products.map((product) => ({
    id: Number(product.id),
    name: product.name,
    owner: product.owner,
    description: product.description,
    location: product.location,
    price: fromWei(product.price),
    deleted: product.deleted,
    images: product.images.split(','),
    listings: Number(product.listings),
    timestamp: Number(product.timestamp),
    purchased: product.purchased,
    category: product.category, // Add category to the structured product
  }))

const structuredPurchases = (purchases) =>
  purchases.map((purchase) => ({
    id: Number(purchase.id),
    aid: Number(purchase.aid),
    tenant: purchase.tenant,
    date: Number(purchase.date),
    price: fromWei(purchase.price),
    checked: purchase.checked,
    cancelled: purchase.cancelled,
  }))

const structuredReviews = (reviews) =>
  reviews.map((review) => ({
    id: Number(review.id),
    aid: Number(review.aid),
    text: review.reviewText,
    rating: Number(review.rating),
    owner: review.owner,
    timestamp: Number(review.timestamp),
  }))

export {
  getProducts,
  getProduct,
  getPurchases,
  getPurchasedDates,
  createProduct,
  updateProduct,
  deleteProduct,
  buyProduct,
  approveProduct,
  refundPurchase,
  addReview,
  getReviews,
  getQualifiedReviewers,
  getSecurityFee,
}
