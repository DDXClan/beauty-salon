from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column

class Review(Base):

    __tablename__ = 'reviews'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(nullable=False)
    service_id: Mapped[int] = mapped_column(nullable=False)
    raiting: Mapped[float] = mapped_column()
    text: Mapped[str] = mapped_column()

