from dependencies import ReviewsRepository
from schemas.reviews import ReviewCreate

class ReviewService:

    def __init__(self, review_repository: ReviewsRepository):
        self.review_repository = review_repository

    def create_review(self, review_data: dict):
        review = self.review_repository.add(review_data)
        return review
    
    def get_all_filter_by(self, **filter_by):
        reviews = self.review_repository.get_all_filter_by(**filter_by)
        return reviews
    
    def delete_review(self, id: int):
        return self.review_repository.delete(id=id)

    def get_review_filter(self, limit: int = None, max_rating: int = None, min_rating: int = None, service_id: int = None, user_id: int = None):
        reviews = self.review_repository.get_reviews_filter(limit=limit, max_rating=max_rating, min_rating=min_rating, service_id=service_id, user_id=user_id)
        return reviews
    
    def get_one_filter_by(self, **filter_by):
        review = self.review_repository.get_one_filter_by(**filter_by)
        return review
    
    def update_review(self, id: int, review_data: ReviewCreate):
        entity = review_data.model_dump()
        entity['id'] = id
        entity = {k: v for k, v in entity.items() if v is not None}
        return self.review_repository.update(entity)





    
    
