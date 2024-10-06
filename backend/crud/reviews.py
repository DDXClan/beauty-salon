from utils.abstract_repository import IREpository
from models.reviews import Review
class ReviewsRepository(IREpository):


    def get_reviews_filter(self, limit: int = None, max_rating: int = None, min_rating: int = None, service_id: int = None, user_id: int = None):
        query = self.session.query(Review)

        if limit:
            query = query.limit(limit)
        
        if max_rating:
            query = query.filter(Review.raiting <= max_rating)
        
        if min_rating:
            query = query.filter(Review.raiting >= min_rating)
        
        if service_id:
            query = query.filter(Review.service_id == service_id)
        
        if user_id:
            query = query.filter(Review.user_id == user_id)
        
        return query.all()

