import { Coupon } from '../types';

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    isActive: true,
  },
  {
    code: 'SUMMER20',
    discountPercentage: 20,
    isActive: true,
  },
  {
    code: 'FLASH30',
    discountPercentage: 30,
    isActive: false,
  },
];