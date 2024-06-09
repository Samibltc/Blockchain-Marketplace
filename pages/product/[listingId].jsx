import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '@/store/globalSlices';
import { Title, ImageGrid, Description, Calendar, Actions, Review, AddReview } from '@/components';
import {
  getReviews,
  getProduct,
  getPurchasedDates,
  getSecurityFee,
  getQualifiedReviewers,
} from '@/services/blockchain';
import { useAccount } from 'wagmi';

export default function Listing({
  productData,
  timestampsData,
  reviewsData,
  securityFee,
  qualifiedReviewers,
}) {
  const router = useRouter();
  const { listingId } = router.query;
  const dispatch = useDispatch();
  const { address } = useAccount();

  const { setProduct, setTimestamps, setReviewModal, setReviews, setSecurityFee } = globalActions;
  const { product, timestamps, reviews } = useSelector((states) => states.globalStates);

  useEffect(() => {
    dispatch(setProduct(productData));
    dispatch(setTimestamps(timestampsData));
    dispatch(setReviews(reviewsData));
    dispatch(setSecurityFee(securityFee));
  }, [
    dispatch,
    setProduct,
    productData,
    setTimestamps,
    timestampsData,
    setReviews,
    reviewsData,
    setSecurityFee,
    securityFee,
  ]);

  const handleReviewOpen = () => {
    dispatch(setReviewModal('scale-100'));
  };

  return (
    <>
      <Head>
        <title>Product | {product?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-8 px-10 sm:px-20 md:px-32 space-y-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Title product={product} />

        <ImageGrid
          first={product?.images[0]}
          second={product?.images[1]}
          third={product?.images[2]}
          forth={product?.images[3]}
          fifth={product?.images[4]}
        />

        <Description product={product} />
        <Calendar product={product} timestamps={timestamps} />
        <Actions product={product} />

        <div className="flex flex-col justify-between flex-wrap space-y-2">
          <div className="flex justify-start items-center space-x-2">
            <h1 className="text-xl font-semibold">Reviews</h1>
            {qualifiedReviewers?.includes(address) && (
              <button
                className="cursor-pointer text-pink-500 hover:text-pink-700"
                onClick={handleReviewOpen}
              >
                Drop your review
              </button>
            )}
          </div>
          <div>
            {reviews.map((review, i) => (
              <Review key={i} review={review} />
            ))}
            {reviews.length < 1 && 'No reviews yet!'}
          </div>
        </div>
      </div>
      <AddReview listingId={listingId} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { listingId } = context.query;
  const productData = await getProduct(listingId);
  const timestampsData = await getPurchasedDates(listingId);
  const qualifiedReviewers = await getQualifiedReviewers(listingId);
  const reviewsData = await getReviews(listingId);
  const securityFee = await getSecurityFee();

  return {
    props: {
      productData: JSON.parse(JSON.stringify(productData)),
      timestampsData: JSON.parse(JSON.stringify(timestampsData)),
      reviewsData: JSON.parse(JSON.stringify(reviewsData)),
      qualifiedReviewers: JSON.parse(JSON.stringify(qualifiedReviewers)),
      securityFee: JSON.parse(JSON.stringify(securityFee)),
    },
  };
};
