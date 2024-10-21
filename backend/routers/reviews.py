from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import get_current_user, get_review_service, ReviewService, get_user_service, UserService, get_service_service, ServiceService
from schemas.reviews import ReviewCreate, Review, ReviewUpdate, UserResponse
from utils.enums import Status, Roles

router = APIRouter()


@router.post('/', status_code=201)
async def create_review(new_review: ReviewCreate,
                        review_service: ReviewService = Depends(get_review_service), 
                        service_service: ServiceService = Depends(get_service_service), user = Depends(get_current_user)):
    service = service_service.get_one_service_filter_by(id=new_review.service_id)
    if not service:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    review = review_service.create_review({
        'user_id': user.id,
        'service_id': service.id,
        'raiting': new_review.raiting,
        'text': new_review.text
    })
    if not review:
        raise HTTPException(status_code=400, detail={'status': Status.FILLED.value})
    return {'status': Status.SUCCESS.value, 'new_review': new_review}


@router.get('/')
def get_reviews(limit: int | None = Query(None), 
                max_rating: int | None = Query(None), 
                min_rating: int | None = Query(None), 
                service_id: int |None = Query(None), 
                user_id: int | None = Query(None),
                review_service: ReviewService = Depends(get_review_service), user_service: UserService = Depends(get_user_service)):
    reviews = review_service.get_review_filter(limit=limit, max_rating=max_rating, min_rating=min_rating, service_id=service_id, user_id=user_id)

    response = []
    for review in reviews:
        user = user_service.get_user_filter_by(id=review.user_id)
        response.append(Review(id=review.id, 
                               service_id=review.service_id, 
                               raiting=review.raiting, 
                               text=review.text, 
                               user=UserResponse(id=user.id, 
                                                 username=user.username, 
                                                 phone_number=user.phone_number,
                                                 image=user.image)))
    return response


@router.patch('/{review_id}')
def update_review(review_id: int, review_update: ReviewUpdate, review_service: ReviewService = Depends(get_review_service), user = Depends(get_current_user)):
    review = review_service.get_one_filter_by(id=review_id)
    if not review:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    if user.id != review.user_id or user.role != Roles.ADMIN.value:
        raise HTTPException(status_code=403, detail={'status': Status.FORBIDDEN.value})
    review = review_service.update_review(review_id, review_update)
    if not review:
        raise HTTPException(status_code=400, detail={'status': Status.FILLED.value})
    return {'status': Status.SUCCESS.value, 'review': review}

@router.delete('/{review_id}')
def delete_review(review_id: int, review_service: ReviewService = Depends(get_review_service), user = Depends(get_current_user)):
    review = review_service.get_one_filter_by(id=review_id)
    if not review:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    if user.id != review.user_id or user.role != Roles.ADMIN.value:
        raise HTTPException(status_code=403, detail={'status': Status.FORBIDDEN.value})
    review = review_service.delete_review(review_id)
    return {'status': Status.SUCCESS.value}

@router.get('/me')
def get_reviews(limit: int | None = Query(None), 
                max_rating: int | None = Query(None), 
                min_rating: int | None = Query(None), 
                service_id: int |None = Query(None), 
                user_id: int | None = Query(None),
                review_service: ReviewService = Depends(get_review_service), user_service: UserService = Depends(get_user_service), user = Depends(get_current_user)):
    reviews = review_service.get_review_filter(limit=limit, max_rating=max_rating, min_rating=min_rating, service_id=service_id, user_id=user.id)

    response = []
    for review in reviews:
        user = user_service.get_user_filter_by(id=review.user_id)
        response.append(Review(id=review.id, 
                               service_id=review.service_id, 
                               raiting=review.raiting, 
                               text=review.text, 
                               user=UserResponse(id=user.id, 
                                                 username=user.username, 
                                                 phone_number=user.phone_number,
                                                 image=user.image)))
    return response