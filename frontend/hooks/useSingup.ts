import { useState } from 'react';
import axios from 'axios';
import { signUp, LoginResponse } from '@/api/auth';
import { useRouter } from 'next/navigation';

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    const handleSignup = async (username: string, password: string, phone_number: string) => {
        setLoading(true);
        setError(null);
        try {
            const data: LoginResponse = await signUp(username, password, phone_number); 
            setToken(data.access_token);
            router.push('/profile');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Ошибка регистрации. Проверьте свои учетные данные');
            } else {
                setError('Ошибка регистрации. Проверьте свои учетные данные');
            }
        } finally {
            setLoading(false);
        }
    };

    return { handleSignup, loading, error, token };
};