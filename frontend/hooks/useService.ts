import { useEffect, useState } from 'react';
import { getServices } from '@/api/service';
import type { Service } from '@/schemas/service';

const useService = () => {
    const [services, setServices] = useState<Service[]>([]);
    
    useEffect(() => {
        const fetchServices = async () => {
            const fetchedServices = await getServices();
            setServices(fetchedServices);
        };

        fetchServices();
    }, []);

    return services;
}

export default useService;