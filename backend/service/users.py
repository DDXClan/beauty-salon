from schemas.users import UserCreate, User, UserLogin, UserUpdate
from dependencies import UserRepository


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
        entity['id'] = user_id
        entity = {k: v for k, v in entity.items() if v is not None}
        return self.user_repository.update(entity)
    
