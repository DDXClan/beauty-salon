from config.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

class Employee(Base):

    __tablename__ = 'employee'
     
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    image: Mapped[str] 
    profession: Mapped[str] = mapped_column(nullable=False)