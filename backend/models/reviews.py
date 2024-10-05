from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column

class Review(Base):

    __tablename__ = 'reviews'


    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(nullable=False)
    service_id: Mapped[int] = mapped_column(nullable=False)
    rating: Mapped[float] = mapped_column()
    message: Mapped[str] = mapped_column()

