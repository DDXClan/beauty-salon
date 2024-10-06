from routers.service import router as service_router
from routers.auth import router as auth_router
from routers.orders import router as orders_router
from routers.users import router as users_router
from routers.reviews import router as reviews_router
from routers.employee import router as employee_router
from fastapi import APIRouter

routers = APIRouter(prefix='/api')

routers.include_router(service_router, prefix='/services', tags=['service'])
routers.include_router(auth_router, prefix='/auth', tags=['auth'])
routers.include_router(orders_router, prefix='/orders', tags=['orders'])
routers.include_router(users_router, prefix='/users', tags=['users'])
routers.include_router(reviews_router, prefix='/reviews', tags=['reviews'])
routers.include_router(employee_router, prefix='/employee', tags=['employee'])

