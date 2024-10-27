import { useEffect, useState } from "react";
import { getProfile } from "@/api/profile";
import { getOrdersProfile } from "@/api/profile";
import { updateProfile } from "@/api/profile";
import type { Profile } from "@/schemas/profile";
import type { Orders } from "@/schemas/orders";
import { patchProfileImage } from "@/api/profile";
import { useToast } from "./use-toast";

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
          } catch {
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
              const fetchedOrders = await getOrdersProfile(access_token);
              setOrders(fetchedOrders);
          } catch {
              setError('Ошибка загрузки заказов.');
          } finally {
              setLoading(false);
          }
      };

      fetchOrders();
  }, []);

  return { orders, loading, error };     
};

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateProfile = async (profile: Profile) => {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
          setError('token отсутствует');
          return;
      }

      try {
          setLoading(true);
          await updateProfile(access_token, profile);
      } catch {
          setError('Ошибка обновления профиля.');
      } finally {
          setLoading(false);
      }
  };


  const {toast} = useToast();
  const handleUpdateImage = async (file: File) => { 
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
        setError('token отсутствует');
        return;
    }
    try {
        setLoading(true);
        
        const formData = new FormData();
        formData.append('image', file);  
        await patchProfileImage(access_token, formData);  
        toast({
            title: "Изображение обновлено",
            description: "Ваше изображение профиля успешно обновлено."

        });
    } catch (error) {
        toast({
            title: "Ошибка обновления картинки.",
            description: "Картинка не была обновлена."
        });
    } finally {
        setLoading(false);
    }
};

  return { handleUpdateProfile, handleUpdateImage, loading, error };
}