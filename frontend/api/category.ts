import { Categories } from "@/schemas/categories";
import axios from 'axios';

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