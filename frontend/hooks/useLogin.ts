
import { useState } from 'react';
import { login, LoginResponse } from '@/api/auth';
import { useRouter } from 'next/navigation';


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    
    setLoading(true);
    setError(null);
    try {
   
      const data: LoginResponse = await login(username, password);
      setToken(data.access_token);
      router.push('/profile');
      
    } catch (err) {
      setError('Ошибка входа. Проверьте свои учетные данные.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, token };
};