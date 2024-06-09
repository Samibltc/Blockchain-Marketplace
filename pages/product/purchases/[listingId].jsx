import { useEffect } from 'react'
import { Purchase } from '@/components'
import { useRouter } from 'next/router'
import { globalActions } from '@/store/globalSlices'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases, getProduct } from '@/services/blockchain'
import { useAccount } from 'wagmi'
import Image from 'next/image'

const Purchases = ({ productData, purchasesData }) => {
  const router = useRouter()
  const { listingId } = router.query

  const dispatch = useDispatch()

  const { setProduct, setPurchases } = globalActions
  const { product, purchases } = useSelector((states) => states.globalStates)
  const { address } = useAccount()

  useEffect(() => {
    dispatch(setProduct(productData))
    dispatch(setPurchases(purchasesData))
  }, [dispatch, setProduct, productData, setPurchases, purchasesData])

  const isSeller = product?.owner === address
  const userPurchases = isSeller ? purchases : purchases.filter(purchase => purchase.tenant === address)

  return (
    <div className="w-full sm:w-3/5 mx-auto mt-8">
      <h1 className="text-center text-3xl text-black dark:text-white font-bold">
        {isSeller ? 'Sold Items' : 'Approve/Refund Your Purchases'}
      </h1>
      <div className="flex flex-col sm:flex-row mt-8">
        <div className="w-full sm:w-1/2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
          <h2 className="text-2xl font-bold text-black dark:text-white mt-4">{product.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{product.description}</p>
          <p className="text-lg text-black dark:text-white font-semibold mt-4">Price: {product.price} ETH</p>
        </div>
        <div className="w-full sm:w-1/2 p-4">
          {userPurchases.length < 1 && <div className="text-center mt-4 text-gray-700 dark:text-gray-300">No Purchases for this product yet</div>}

          {userPurchases.map((purchase, i) => (
            <Purchase key={i} id={listingId} purchase={purchase} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Purchases

export const getServerSideProps = async (context) => {
  const { listingId } = context.query
  const productData = await getProduct(listingId)
  const purchasesData = await getPurchases(listingId)

  return {
    props: {
      productData: JSON.parse(JSON.stringify(productData)),
      purchasesData: JSON.parse(JSON.stringify(purchasesData)),
    },
  }
}
