from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column

class User(Base):
    
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    phone_number: Mapped[str] 
    image: Mapped[str]
    role: Mapped[str] = mapped_column(nullable=False, default='USER')