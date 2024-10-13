export type Service = {
    id: number;
    name: string;
    description?: string;
    img?: string;
    id_category: number;
    category: {
        id: number;
        name: string;
    };
}