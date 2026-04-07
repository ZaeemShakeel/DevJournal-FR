import { formatDistanceToNow, format } from 'date-fns';

export const formatRelativeDate = (date) => {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatDateSimple = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM dd, yyyy');
};

export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text?.split(/\s+/g).length || 0;
  return Math.ceil(wordCount / wordsPerMinute);
};
