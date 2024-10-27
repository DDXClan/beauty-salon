'use client';
import apiAxios from "@/axios/axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface User {
    id: number;
    username: string;
    phone_number: string;
    image: string | null;
    role: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const fetchUsers = async () => {
            const interval = setInterval(() => {
                setProgress(prev => {
                  if (prev >= 89) {
                    clearInterval(interval); 
                    return 89;
                  }
                  return Math.min(prev + 1, 89); 
                });
              }, 75);
            try {
              const response = await apiAxios<User[]>({ url: "/users/all", method: "GET" });
              setUsers(response.data);
            } catch {
              setError("Ошибка при получении заказов. Попробуйте позже.");
            } finally {
              setLoading(false);
            }
            setProgress(99);
                setTimeout(() => {
                  setLoading(false);
                }, 1000)
            return () => clearInterval(interval);}

        fetchUsers();
    }, []);

    if (progress != 100 && loading) return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
           <Progress value={progress} className="w-[60%]" />
        </div>
      )
    if (error) return <p>{error}</p>;

    return (
        <Table>
            <TableCaption>Список пользователей</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Имя пользователя</TableHead>
                    <TableHead>Номер телефона</TableHead>
                    <TableHead>Изображение</TableHead>
                    <TableHead>Роль</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.phone_number}</TableCell>
                        <TableCell>
                            {user.image ? (
                                <img src={`http://localhost:8000/${user.image}`} alt={user.username} className="w-12 h-12 object-cover" />
                            ) : (
                                "Нет изображения"
                            )}
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Общее количество пользователей</TableCell>
                    <TableCell>{users.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default Users;
