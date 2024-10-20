import { useEffect, useState } from "react";
import { getProfile } from "@/api/profile";
import { getOrdersProfile } from "@/api/profile";
import type { Profile } from "@/schemas/profile";
import type { Orders } from "@/schemas/orders";

export const useProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const access_token = localStorage.getItem('access_token'); 
            if (!access_token) {
                setError('token отсутствует');
                setLoading(false);
                return;
            }

            try {
                const fetchedProfile = await getProfile(access_token); 
                setProfile(fetchedProfile);
            } catch (err) {
                setError('Ошибка загрузки профиля.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { profile, loading, error }; 
};




export const useOrdersProfile = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const access_token = localStorage.getItem('access_token'); 
      if (!access_token) {
        setError('token отсутствует');
        setLoading(false);
        return;
      }
  
      try {
        const fetchedOrders = await getOrdersProfile();
        console.log('Fetched Orders:', fetchedOrders); 
        setOrders(fetchedOrders);
      } catch (err) {
        console.error(err); // Логируем ошибку
        setError('Ошибка загрузки заказов.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  return { orders, loading, error };     
}


