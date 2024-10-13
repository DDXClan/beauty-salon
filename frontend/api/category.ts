import { Categories } from "@/schemas/categories";
import axios from 'axios';


// export const categories: Categories[] = [
//     { id: 0, name: 'Парикмахерские услуги' },
//     { id: 1, name: 'Уход за кожей' },
//     { id: 2, name: 'Маниюкр' },
//     { id: 3, name: 'Педикюр' },
//     { id: 4, name: 'Эстетическая косметология' },
//     { id: 5, name: 'Массаж' },
//     { id: 6, name: 'Свадебные и вечерние услуги' },
//     { id: 7, name: 'Cпа-процедуры' },
// ]

export async function getCategories(): Promise<Categories[]> {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/services/categories');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}