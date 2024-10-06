from schemas.users import UserCreate, User, UserLogin
from dependencies import UserRepository


class UserService: 

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def get_user_filter_by(self, **filter_by):
        user = self.user_repository.get_one_filter_by(**filter_by)
        return user