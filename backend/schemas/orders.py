from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from utils.enums import OrderStatus
from typing import Optional
from schemas.service import Service
import pytz

class OrderCreate(BaseModel):
    service_id: int = Field(ge=1)
    appointment_time: datetime

    @field_validator('appointment_time')
    @classmethod
    def validate_appointment_time(cls, value: datetime) -> datetime:
        timezone = pytz.timezone('Europe/Moscow')
        local_appointment_time = value.astimezone(timezone)
        date_of_appointment = local_appointment_time.date()
        start_time = timezone.localize(datetime.combine(date_of_appointment, datetime.min.time()).replace(hour=9, minute=0, second=0))
        end_time = timezone.localize(datetime.combine(date_of_appointment, datetime.min.time()).replace(hour=17, minute=0, second=0))

        if local_appointment_time.weekday() in (5, 6):
            raise ValueError("Appointment time cannot be on Saturday or Sunday.")

        if local_appointment_time < start_time or local_appointment_time > end_time:
            raise ValueError(f"Appointment time must be between {start_time.time()} and {end_time.time()}.")

        return value
    
class OrderUpdate(BaseModel):
    total_price: Optional[float] = Field(ge=0, default=None)
    status: Optional[OrderStatus] = None
    finished_at: Optional[datetime] = None
    appointment_time: Optional[datetime] = None

    @field_validator('appointment_time')
    @classmethod
    def validate_appointment_time(cls, value: datetime) -> datetime:
        timezone = pytz.timezone('Europe/Moscow')
        local_appointment_time = value.astimezone(timezone)
        date_of_appointment = local_appointment_time.date()
        start_time = timezone.localize(datetime.combine(date_of_appointment, datetime.min.time()).replace(hour=9, minute=0, second=0))
        end_time = timezone.localize(datetime.combine(date_of_appointment, datetime.min.time()).replace(hour=17, minute=0, second=0))

        if local_appointment_time.weekday() in (5, 6):
            raise ValueError("Appointment time cannot be on Saturday or Sunday.")

        if local_appointment_time < start_time or local_appointment_time > end_time:
            raise ValueError(f"Appointment time must be between {start_time.time()} and {end_time.time()}.")

        return value
    
    @field_validator('finished_at')
    @classmethod
    def validate_appointment_time(cls, value: datetime) -> datetime:
        timezone = pytz.timezone('Europe/Moscow')
        local_finished_time = value.astimezone(timezone)
        date_of_appointment = local_finished_time.date()
        start_time = timezone.localize(datetime.combine(date_of_appointment, datetime.min.time()).replace(hour=9, minute=0, second=0))
        end_time = timezone.localize(datetime.combine(date_of_appointment, datetime.min.time()).replace(hour=17, minute=0, second=0))

        if local_finished_time.weekday() in (5, 6):
            raise ValueError("Appointment time cannot be on Saturday or Sunday.")

        if local_finished_time < start_time or local_finished_time > end_time:
            raise ValueError(f"Appointment time must be between {start_time.time()} and {end_time.time()}.")

        return value


class Order(BaseModel):
    id: int
    service: Service
    appointment_time: datetime
    total_price: Optional[float] = Field(ge=0)
    status: OrderStatus
    finished_at: Optional[datetime]



