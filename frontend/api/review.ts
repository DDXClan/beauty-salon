import { Review } from "@/schemas/review";
import axios from "axios";

// export const reviews: Review[] = [
//     { id: 0, name: 'Алексей', text: 'Я придурок пошел в этот блятский сол мне вырвали ногти волосы паальцы мозг? и не имею смсыла дальше жить потому что я еблан Я придурок пошел в этот блятский сол мне вырвали ногти волосы паальцы мозг? и не имею смсыла дальше жить потому что я еблан Я придурок пошел в этот блятский сол мне вырвали ногти волосы паальцы мозг? и не имею смсыла дальше жить потому что я еблан', img: 'logo.png', stars: 5 },
//     { id: 1, name: 'Александр', text: 'Отличный сервис!', img: 'logo.png', stars: 4 },
//     { id: 2, name: 'Анна', text: 'Очень понравилось!', img: 'logo.png', stars: 3 },
//     { id: 3, name: 'Александр', text: 'Очень понравилось!', img: 'logo.png', stars: 4 },
//     { id: 4, name: 'Александр', text: 'Очень понравилось!', img: 'logo.png', stars: 5 },
// ];

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
