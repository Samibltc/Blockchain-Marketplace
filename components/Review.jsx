import ReactStars from 'react-stars';
import Identicon from 'react-identicons';
import { formatDate, truncate } from '@/utils/helper';

const Review = ({ review }) => {
  return (
    <div className="w-1/2 pr-5 space-y-2">
      <div className="pt-2 flex items-center space-x-2">
        <Identicon
          string={review.owner}
          size={20}
          className="rounded-full shadow-gray-500 shadow-sm"
        />
        <div className="flex justify-start items-center space-x-2">
          <p className="text-md font-semibold dark:text-gray-300">{truncate(review.owner, 4, 4, 11)}</p>
          <p className="text-slate-500 text-sm dark:text-gray-400">{formatDate(review.timestamp)}</p>
        </div>
      </div>
      {/* Display rating */}
      <div className="flex items-center">
        <p className="text-slate-500 text-sm mr-2 dark:text-gray-400">Rating: {review.rating}/5</p>
        <ReactStars
          count={5}
          value={review.rating}
          size={20}
          half={false}
          color2={'#ffd700'}
          edit={false}
        />
      </div>
      {/* Display comment */}
      <p className="text-slate-500 text-sm w-full sm:w-4/5 dark:text-gray-300">{review.text}</p>
    </div>
  );
};

export default Review;
