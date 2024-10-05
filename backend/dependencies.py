from crud import *
from models.service import Service, ServiceImage, Category
from models.users import User
from models.orders import Order
from models.reviews import Review
from fastapi import Depends
from sqlalchemy.orm import Session
from service import *
from config.database import get_session
from config.auth import oauth2_scheme

def get_service_repository(db: Session = Depends(get_session)):
    return ServicerRepository(model=Service, session=db)

def get_service_image_repository(db: Session = Depends(get_session)):
    return ServicerRepository(model=ServiceImage, session=db)

def get_category_repository(db: Session = Depends(get_session)):
    return ServicerRepository(model=Category, session=db)

def get_user_repository(db: Session = Depends(get_session)):
    return UserRepository(model=User, session=db)

def get_order_repository(db: Session = Depends(get_session)):
    return OrderRepository(model=Order, session=db)

def get_review_repository(db: Session = Depends(get_session)):
    return ReviewsRepository(model=Review, session=db)

def get_service_service(service_repository: ServicerRepository = Depends(get_service_repository),
                        category_service: ServicerRepository = Depends(get_category_repository),
                        ) -> ServiceService:
    return ServiceService(service_repository=service_repository,
                          category_repository=category_service)

def get_auth_service(user_repository: UserRepository = Depends(get_user_repository)) -> AuthService:
    return AuthService(user_repository=user_repository)

def get_current_user(token: str= Depends(oauth2_scheme), user_repository: UserRepository = Depends(get_user_repository)):
    service = AuthService(user_repository=user_repository)
    return service.get_user_by_token(token)

