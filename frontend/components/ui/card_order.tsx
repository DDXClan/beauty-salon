import "@/styles/card_order.css";
import Image from "next/image";
import { Button } from "./button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useOrdersProfile } from "@/hooks/useProfile";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import { useEffect, useState } from "react";

interface Review {
  id: number;
  service_id: number;
  raiting: number;  
  text: string;
  user: {
    id: number;
    username: string;
    phone_number: string;
    image: string;
  };
}

const Card_order = () => {
  const profile = useProfile();
  const { orders, loading, error } = useOrdersProfile();
  const [reviews, setReviews] = useState<Review[]>([]);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/reviews/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [access_token]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="all__card_order__profile">
      {orders.map((order) => {
        const review = reviews.find((r) => r.service_id === order.service.id);
        return (
          <div key={order.id} className="card_order">
            <div className="card__content__profile">
              <Image
                width={100}
                height={100}
                className="card__content_img"
                src={"/placeholder.png"}
                alt="logo"
              />
              <div className="card__content_info">
                <div>
                  <p>{order.service.name}</p>
                  <p>Статус: {order.status}</p>
                  <p>
                    Дата: {order.appointment_time ? formatDate(order.appointment_time) : "Дата не указана"}
                  </p>
                </div>
              </div>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant={"outline"} className="w-[261px] h-[48px] profile__card__button">
                  Ваш отзыв
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-408">
                <DrawerHeader>
                  <div
                    style={{ display: "flex", justifyContent: "space-between", width: "408px", margin: "0 auto" }}
                    className="title_drawer"
                  >
                    <DrawerTitle>{profile.profile?.username}</DrawerTitle>
                    <DrawerTitle>Оценка: {review ? review.raiting : "Нет оценки"}</DrawerTitle>
                  </div>
                  <DrawerDescription style={{ margin: "0 auto" }} className="w-[408px]">
                    {review ? review.text : "Отзыв отсутствует"}
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button className="w-[408px] h-[48px] profile__card__button">
                    Изменить оценку или отзыв
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        );
      })}
    </div>
  );
};

export default Card_order;