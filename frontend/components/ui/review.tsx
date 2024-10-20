import React, { useEffect } from 'react';
import '@/styles/review.css';
// import { reviews } from '@/api/review';
import useReviews from '@/hooks/useReview';
import StarRating from './starrating'; 
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Review = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const reviews = useReviews();
 
    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleDotClick = (index: any) => {
        if (api) {
            api.scrollTo(index);
        }
    };

    return ( 
        <div className='all__review'>
            <h2 className='review__title'>Наши отзывы</h2>
            <div className='review' >
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({ delay: 4000 }),
                    ]}
                    setApi={setApi}
                    className="carousel" 
                >
                    <CarouselContent>
                        {Array.from(reviews).map((review, index) => (
                            <CarouselItem  key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-3">
                                    <Card style={{ width: '392px', border: 'none' }}>
                                        <CardContent className="p-3" style={{ width: '100%' }} >
                                            <div className="review__list">
                                                <img src={review.user.image}
                                                  onError={(e) => { 
                                                    const target = e.target as HTMLImageElement; 
                                                    target.onerror = null; 
                                                    target.src = 'placeholder.png'; }} 
                                                alt={review.username} className="review__img" 
                                                />
                                                <div className='review__list__text'>
                                                    <div className='review__list__text__name'>
                                                        <h2 className='review__name'>{review.user.username}</h2>
                                                        <StarRating rating={review.raiting || 0} /> 
                                                    </div>
                                                    <p className='review__text'>{review.text}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="py-2 text-center text-sm text-muted-foreground">
                {Array.from({ length: count }, (_, index) => (
                    <span 
                        key={index} 
                        className={`inline-block mx-1 cursor-pointer ${index + 1 === current ? 'text-current' : 'text-muted'}`}
                        style={{ fontSize: '1.5rem' }}
                        onClick={() => handleDotClick(index)} 
                    >
                        •
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Review;
