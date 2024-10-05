from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column


class Category(Base):

    __tablename__ = 'category'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    description: Mapped[str]

class Service(Base):

    __tablename__ = 'service'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    category_id: Mapped[int] = mapped_column(nullable=False)
    start_price: Mapped[float] = mapped_column(nullable=False)
    end_price: Mapped[float] = mapped_column()
    description: Mapped[str]


class ServiceImage(Base):

    __tablename__ = 'service_image'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    service_id: Mapped[int] = mapped_column(nullable=False)
    image: Mapped[str]
