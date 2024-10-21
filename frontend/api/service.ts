import { Service } from "@/schemas/service";
import axios from "axios";


export async function getServices(): Promise<Service[]> {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/services/');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
