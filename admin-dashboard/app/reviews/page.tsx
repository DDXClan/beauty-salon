'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import apiAxios from "@/axios/axios";
import { Progress } from "@/components/ui/progress";

interface Review {
  id: number;
  user: {
    id: number;
    username: string;
    phone_number: string;
    image: string;
  };
  raiting: number;
  text: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
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
        const response = await apiAxios<Review[]>({url: '/reviews/', method: 'GET'});
        setReviews(response.data);
      } catch (err) {
        setError('Ошибка при получении отзывов');
      }
      setProgress(99);
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      return () => clearInterval(interval);
    };

    fetchReviews();
  }, []);
  if (progress != 100 && loading) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
       <Progress value={progress} className="w-[60%]" />
    </div>
  )
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: '90%', margin: '2rem' }}>
      <Accordion type="single" collapsible>
        {reviews.map(review => (
          <AccordionItem key={review.id} value={`item-${review.id}`}>
            <AccordionTrigger style={{ fontSize: '1.4rem', margin: '0rem 1rem' }}>
              <div style={{ alignItems: 'center', display: 'flex', width: '100%' }}>
                {review.user.username} - {review.raiting} ⭐
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>{review.user.username}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{review.text}</p>
                </CardContent>
                <CardFooter>
                  <p>Рейтинг: {review.raiting} ⭐</p>
                </CardFooter>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ReviewsPage;
