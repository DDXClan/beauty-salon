'use client';
import { useState, useEffect } from "react";
import apiAxios from "@/axios/axios";
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";


interface Order {
  id: number;
  service: {
    name: string;
    category: {
      name: string;
    };
  };
  appointment_time: string;
  status: string;
  total_price: number | null;
}

const statusOptions = [
  { value: "PENDING", label: "Ожидание" },
  { value: "PROCESSING", label: "В процессе" },
  { value: "COMPLETED", label: "Завершено" },
  { value: "CANCELLED", label: "Отменено" },
];

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0)

  const fetchOrders = async () => {
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
      const response = await apiAxios<Order[]>({ url: "/orders/", method: "GET" });
      setOrders(response.data);
    } catch {
      setError("Ошибка при получении заказов. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
    setProgress(99);
        setTimeout(() => {
          setLoading(false);
        }, 1000)
    return () => clearInterval(interval);
  };

  const updateOrderStatus = async (id: number, newStatus: string, newTotalPrice: number | null) => {
    try {
      await apiAxios({
        url: `/orders/${id}/`,
        method: "PATCH",
        data: {
          status: newStatus,
          total_price: newTotalPrice, // Включаем total_price в запрос
        },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus, total_price: newTotalPrice } : order
        )
      );
    } catch {
      alert("Ошибка при обновлении заказа. Попробуйте снова.");
    }
  };

  useEffect(() => {
     
    fetchOrders();
    
  }, []);

  if (progress != 100 && loading) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
       <Progress value={progress} className="w-[60%]" />
    </div>
  )
  if (error) return <p>{error}</p>;

  return (
    <Table>
      <TableCaption>Список ваших заказов.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Услуга</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>Время записи</TableHead>
          <TableHead>Сумма</TableHead> {/* Добавлено поле для суммы */}
          <TableHead className="text-right">Статус</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.service.name}</TableCell>
            <TableCell>{order.service.category.name}</TableCell>
            <TableCell>{new Date(order.appointment_time).toLocaleString()}</TableCell>
            <TableCell>
              <input
                type="number"
                value={order.total_price !== null ? order.total_price : ""}
                onChange={(e) => {
                  const newTotalPrice = e.target.value ? parseFloat(e.target.value) : null;
                  setOrders((prevOrders) =>
                    prevOrders.map((o) => (o.id === order.id ? { ...o, total_price: newTotalPrice } : o))
                  );
                }}
                onBlur={() => {
                  updateOrderStatus(order.id, order.status, order.total_price);
                }}
              />
            </TableCell>
            <TableCell className="text-right">
              <Select
                value={order.status}
                onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus, order.total_price)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{statusOptions.find(option => option.value === order.status)?.label}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Статусы</SelectLabel>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Общее количество заказов</TableCell>
          <TableCell className="text-right">{orders.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default OrdersTable;
