from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column


class Order(Base):

    __tablename__ = 'orders'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column()
    service_id: Mapped[int] = mapped_column()
    total_price: Mapped[float] = mapped_column()
    status: Mapped[str] = mapped_column()
    created_at: Mapped[str] = mapped_column()
    finished_at: Mapped[str] = mapped_column()

