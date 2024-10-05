from routers.service import router as service_router
from routers.auth import router as auth_router
from fastapi import APIRouter

routers = APIRouter(prefix='/api')

routers.include_router(service_router, prefix='/services', tags=['service'])
routers.include_router(auth_router, prefix='/auth', tags=['auth'])