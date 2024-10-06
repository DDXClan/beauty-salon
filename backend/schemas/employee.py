from pydantic import BaseModel, Field
from utils.enums import Profession
from typing import Optional


class EmployeeCreate(BaseModel):
    name: str
    profession: Profession

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    profession: Optional[Profession] = None