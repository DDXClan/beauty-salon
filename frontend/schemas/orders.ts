export type Orders = {
    id : number,
    service: {
        id: number,
        name: string,
        img?: string,
        id_category?: number,
        category: {
            id: number,
            name: string
            description?: string,
        }
        start_price?: number,
        end_price?: number,
        description: string,
    }
    appointment_time?: string,
    total_price?: number,
    status?: string,
    finished_at?: string
}