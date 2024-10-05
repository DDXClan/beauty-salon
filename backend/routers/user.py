from fastapi import APIRouter, Depends, HTTPException
from dependencies import get_auth_service, AuthService
from schemas.users import UserCreate
from utils.enums import Status

router = APIRouter()

@router.post('/signup', status_code=201)
async def signup(new_user: UserCreate, user_service: AuthService = Depends(get_auth_service)):
    user = user_service.create_user(new_user)
    if not user:
        raise HTTPException(status_code=400, detail={'status', Status.FILLED.value})
    return {'status': Status.SUCCESS.value}

