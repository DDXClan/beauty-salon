import { useEffect, useState } from 'react';
import { getCategories } from '@/api/category';
import type { Categories } from '@/schemas/categories';

const useCategory = () => {
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);

    return categories;
};

export default useCategory