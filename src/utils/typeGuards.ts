import { LayoutType } from '../types';

export const isValidLayoutType = (layout: string): layout is LayoutType => {
  return ['1shot', '3shot', '4shot', '6shot'].includes(layout);
};