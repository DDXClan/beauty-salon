type StarRatingProps = {
    rating: number; 
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;
        return (
            <span key={index} className={starIndex <= rating ? 'star gold' : 'star gray'}>
                ★
            </span>
        );
    });

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
