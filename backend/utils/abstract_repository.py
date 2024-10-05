from abc import ABC, abstractmethod
from sqlalchemy.orm import Session

class AbstractRepository(ABC):
    @abstractmethod
    def get_all_filter_by(self):
        pass

    @abstractmethod
    def get_one_filter_by(self, id):
        pass

    @abstractmethod
    def add(self, entity):
        pass

    @abstractmethod
    def update(self, entity):
        pass

    @abstractmethod
    def delete(self, entity):
        pass


class IREpository(AbstractRepository):

    def __init__(self, model, session: Session):
        self.model = model
        self.session = session
    
    def get_all_filter_by(self, **filters):
        return self.session.query(self.model).filter_by(**filters).all()

    def get_one_filter_by(self, **filters):
        return self.session.query(self.model).filter_by(**filters).first()
    
    def add(self, entity: dict):
        entity = self.model(**entity)
        self.session.add(entity)
        self.session.commit()
        return entity
    

    def update(self, entity: dict):
        self.session.query(self.model).filter_by(id=entity['id']).update(entity)
        self.session.commit()
        return entity
    
    def delete(self, id: int):
        self.session.query(self.model).filter_by(id=id).delete()
        self.session.commit()
