import "@/styles/card_order.css";
import Image from "next/image";
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { getOrdersProfile } from "@/api/profile";
import { useOrdersProfile } from "@/hooks/useProfile";
import { useProfile } from "@/hooks/useProfile";


const Card_order = () => {
    const profile  = useProfile();
    const { orders, loading, error } = useOrdersProfile();
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Делаем день двухзначным
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = String(date.getFullYear()).slice(-2); // Берем последние 2 цифры года
        return `${day}.${month}.${year}`;
      };
      
    return ( 
        <div className="all__card_order__profile">
        {orders.map ((order) => (
        <div className="card_order">
            <div className="card__content__profile">
                <Image width={100} height={100} className="card__content_img" src={"/placeholder.png"} alt="logo" />
                <div className="card__content_info">
                    <div key={order.id}>
                            <p>{order.service.name}</p>
                            <p>Статус: {order.status}</p>
                            <p>Дата: {order.appointment_time ? formatDate(order.appointment_time) : 'Дата не указана'}</p>
                        </div>
                </div>
            </div>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant={"outline"} className="w-[261px] h-[48px] profile__card__button"> Ваш отзыв</Button>
                </DrawerTrigger>
                <DrawerContent className="w-408">
                    <DrawerHeader>
                        <div style={{display: "flex", justifyContent: "space-between", width: "408px", margin: "0 auto"}} className="title_drawer">
                            <DrawerTitle>{profile.profile?.username}</DrawerTitle>
                            <DrawerTitle>Оценка: 5</DrawerTitle> 
                        </div>
                        <DrawerDescription style={{margin: "0 auto"}} className="w-[408px]">Ну вообще прикольный салон но можно мне кажется лучше, вот ЕСЛИБ МНЕ ПОДРОЧИЛИ. 
                            Если исполните мою мечту возможно поставлю 5fives звезд но а пока 1 и все тут
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button className="w-[408px] h-[48px] profile__card__button"> Изменить оценку или отзыв</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
        ))}
        </div>
     );
}
 
export default Card_order;


{/* <Button variant={"outline"} className="w-[261px] h-[48px] profile__card__button"> Ваш отзыв</Button> */}