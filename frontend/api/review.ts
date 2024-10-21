import { Review } from "@/schemas/review";
import axios from "axios";

export async function getReviews(): Promise<Review[]> {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/reviews/');
      console.log(response.data); 
      return response.data; 
    } catch (error) {
      console.error(error);
      return []; 
    }
  }
