from pydantic import BaseModel, Field, field_validator
from typing import List, Optional


class CategoryCreate(BaseModel):
    name: str = Field(max_length=20)
    description: Optional[str] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    
    @field_validator('name')
    @classmethod
    def name_len_validate(cls, v: str) -> str:
        if (len(v) > 20):
            raise ValueError('Name must be less than 20 characters')
        return v
    
class ServiceCreate(BaseModel):
    name: str = Field(max_length=20)
    category_id: int = Field(ge=1)
    start_price: float = Field(get=0.0)
    end_price: float = Field(get=0.0)
    description: Optional[str] = None


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    category_id: Optional[int] = None
    start_price: Optional[float] = None
    end_price: Optional[float] = None
    description: Optional[str] = None

    @field_validator('name')
    @classmethod
    def name_len_validate(cls, v: str) -> str:
        if (len(v) > 20):
            raise ValueError('Name must be less than 20 characters')
        return v
    
    @field_validator('category_id')
    @classmethod
    def category_id_validate(cls, v: int) -> int:
        if (v < 1):
            raise ValueError('Category id must be greater than 0')
        return v
    
    @field_validator('start_price')
    @classmethod
    def start_price_validate(cls, v: float) -> float:
        if (v < 0.0):
            raise ValueError('Start price must be greater than 0.0')
        return v
    
    @field_validator('end_price')
    @classmethod
    def end_price_validate(cls, v: float) -> float:
        if (v < 0.0):
            raise ValueError('End price must be greater than 0.0')
        return v


