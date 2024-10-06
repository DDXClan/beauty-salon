from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

class Order(Base):

    __tablename__ = 'orders'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(nullable=False)
    service_id: Mapped[int] = mapped_column(nullable=False)
    total_price: Mapped[float] = mapped_column()
    status: Mapped[str] = mapped_column(default='PENDING')
    created_at: Mapped[str] = mapped_column(default=datetime.now)
    finished_at: Mapped[str] = mapped_column()
    appointment_time: Mapped[str] = mapped_column(nullable=False)