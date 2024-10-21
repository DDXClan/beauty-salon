import { useEffect, useState } from 'react';
import { getReviews } from '@/api/review';
import type { Review } from '@/schemas/review';


export const useReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]); 
  
    useEffect(() => {
      const fetchReviews = async () => {
        const fetchedReviews = await getReviews();
        setReviews(fetchedReviews); 
      };
  
      fetchReviews();
    }, []); 
  
    return reviews; 
  };
  
  export default useReviews;