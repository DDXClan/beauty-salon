from pydantic import BaseModel, Field, field_validator
import re
from typing import Optional

class UserCreate(BaseModel):
    username: str 
    password: str = Field(min_length=8)
    phone_number: str

    @field_validator('phone_number')
    @classmethod
    def validate_phone_number(cls, v):
        if "+" in v:
            v = v.replace("+","")
        if not re.match(r'^[0-9]{11}$', v):
            raise ValueError('Invalid phone number')
        return v
    

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$', v):
            raise ValueError('Invalid password')
        return v

class UserLogin(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: int
    username: str 
    phone_number: Optional[str] = None
    password: str
    role: str
    image: str 

