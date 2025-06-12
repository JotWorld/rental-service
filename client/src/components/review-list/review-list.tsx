import { Review } from '../../types/review';
import { ReviewItem } from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';

type Props = {
  reviews: Review[];
};

export function ReviewList({ reviews }: Props) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      <ReviewForm />
    </section>
  );
}
