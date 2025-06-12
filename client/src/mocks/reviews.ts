import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Alice',
      avatarUrl: '/img/avatar-alice.jpg',
      isPro: true
    },
    rating: 5,
    comment: 'Amazing place! Highly recommended.',
    date: '2023-04-01'
  },
  {
    id: '2',
    user: {
      name: 'Bob',
      avatarUrl: '/img/avatar-bob.jpg',
      isPro: false
    },
    rating: 4,
    comment: 'Nice location and clean rooms.',
    date: '2023-03-15'
  }
];
