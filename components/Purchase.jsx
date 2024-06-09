import Link from 'next/link'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import Identicon from 'react-identicons'
import { formatDate, truncate } from '@/utils/helper'
import { approveProduct, refundPurchase } from '@/services/blockchain'
import { FaArrowRight } from 'react-icons/fa'

const Purchase = ({ purchase, product }) => {
  const { address } = useAccount()

  const handleCheckIn = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await approveProduct(purchase.aid, purchase.id)
          .then(async (tx) => {
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Checked In successfully',
        error: 'Encountered error',
      }
    )
  }

  const handleRefund = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await refundPurchase(purchase.aid, purchase.id)
          .then(async () => {
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Refunded successfully',
        error: 'Encountered error',
      }
    )
  }

  const purchasedDayStatus = (purchase) => {
    const purchasedDate = new Date(purchase.date).getTime()
    const current = new Date().getTime()
    return purchasedDate < current && !purchase.checked
  }

  const functions = {
    purchasedDayStatus,
    handleCheckIn,
    handleRefund,
  }

  const isSeller = product?.owner === address

  return (
    <div className="w-full flex justify-between items-center my-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-md">
      <div className="flex items-center">
        <Identicon
          string={isSeller ? purchase.tenant : product.owner}
          size={30}
          className="rounded-full shadow-gray-500 shadow-sm"
        />
        <div className="flex flex-col ml-3">
          <span className="text-black dark:text-white">{formatDate(purchase.date)}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">{truncate(isSeller ? purchase.tenant : product.owner, 4, 4, 11)}</span>
        </div>
      </div>

      <FaArrowRight className="text-gray-500 dark:text-gray-400" />

      <div className="flex space-x-2 items-center">
        <Identicon
          string={isSeller ? product.owner : purchase.tenant}
          size={30}
          className="rounded-full shadow-gray-500 shadow-sm"
        />
        <span className="text-gray-500 dark:text-gray-400 text-sm">{truncate(isSeller ? product.owner : purchase.tenant, 4, 4, 11)}</span>
      </div>

      {!isSeller && !purchase.checked && !purchase.cancelled && (
        <div className="flex space-x-2">
          <button
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm px-4"
            onClick={functions.handleCheckIn}
          >
            Approve
          </button>

          <button
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm px-4"
            onClick={functions.handleRefund}
          >
            Refund
          </button>
        </div>
      )}

      {!isSeller && purchase.checked && !purchase.cancelled && (
        <button
          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium italic rounded-full text-sm px-4"
        >
          Approved
        </button>
      )}

      {isSeller && !purchase.cancelled && (
        <button
          className="p-2 bg-orange-500 hover:bg-orange-600 text-white font-medium italic rounded-full text-sm px-4"
        >
          Purchase Complete
        </button>
      )}

      {purchase.cancelled && (
        <button
          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium italic rounded-full text-sm px-4"
        >
          Cancelled
        </button>
      )}
    </div>
  )
}

export default Purchase
