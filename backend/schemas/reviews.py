from pydantic import BaseModel, Field
from utils.enums import Profession
from typing import Optional
from schemas.users import UserResponse


class ReviewCreate(BaseModel):
    service_id: int 
    raiting: Optional[float] = Field(ge=0, le=5)
    text: str = Field(max_length=255)

class ReviewUpdate(BaseModel):
    raiting: Optional[float] = Field(ge=0, le=5)
    text: str = Field(max_length=255)


class Review(BaseModel):
    id: int
    service_id: int
    raiting: Optional[float]
    text: str
    user: UserResponse


