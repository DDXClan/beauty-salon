from crud import *
from models.service import Service, ServiceImage, Category
from models.users import User
from models.orders import Order
from models.reviews import Review
from models.employee import Employee
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from service import *
from config.database import get_session
from config.auth import oauth2_scheme
from utils.enums import Roles, AuthStatus


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


def get_employee_repository(db: Session = Depends(get_session)):
    return EmployeeRepository(model=Employee, session=db)


def get_service_service(service_repository: ServicerRepository = Depends(get_service_repository),
                        category_service: ServicerRepository = Depends(get_category_repository),
                        ) -> ServiceService:
    return ServiceService(service_repository=service_repository,
                          category_repository=category_service)


def get_auth_service(user_repository: UserRepository = Depends(get_user_repository)) -> AuthService:
    return AuthService(user_repository=user_repository)


def get_current_user(token: str= Depends(oauth2_scheme), user_repository: UserRepository = Depends(get_user_repository)) -> User:
    service = AuthService(user_repository=user_repository)
    return service.get_user_by_token(token)


def get_current_admin(token: str= Depends(oauth2_scheme), user_repository: UserRepository = Depends(get_user_repository)) -> User:
    service = AuthService(user_repository=user_repository)
    user = service.get_user_by_token(token)
    if user.role != Roles.ADMIN.value:
        raise HTTPException(status_code=403, detail={'status': AuthStatus.FORBIDDEN.value})
    return user

def get_order_service(order_repository: OrderRepository = Depends(get_order_repository)) -> OrderService:
    return OrderService(order_repository=order_repository)


def get_user_service(user_repository: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(user_repository=user_repository)

def get_review_service(review_repository: ReviewsRepository = Depends(get_review_repository)) -> ReviewService:
    return ReviewService(review_repository=review_repository)

def get_employee_service(employee_repository: EmployeeRepository = Depends(get_employee_repository)) -> EmployeeService:
    return EmployeeService(employee_repository=employee_repository)

