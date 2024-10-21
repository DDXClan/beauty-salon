from fastapi import HTTPException
from schemas.users import UserCreate, User, UserLogin, UserUpdate
from dependencies import UserRepository
from passlib.hash import pbkdf2_sha256
from utils.enums import AuthStatus
class UserService: 

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def get_user_filter_by(self, **filter_by):
        user = self.user_repository.get_one_filter_by(**filter_by)
        return user
    
    def get_all_users(self, **filter_by):
        users = self.user_repository.get_all_filter_by(**filter_by)
        return users
    
    def update_user(self, user_id: int, data: UserUpdate):
        entity = data.model_dump()
        user = self.get_user_filter_by(id=user_id)
        if data.password and not pbkdf2_sha256.verify(data.password, user.password):
            raise HTTPException(status_code=403, detail={'status': AuthStatus.INVALID_PASSWORD.value})
        if data.password:
            entity['password'] = pbkdf2_sha256.hash(data.password)
        entity['id'] = user_id
        entity = {k: v for k, v in entity.items() if v is not None}
        return self.user_repository.update(entity)
    
