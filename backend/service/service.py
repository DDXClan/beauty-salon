from dependencies import ServicerRepository
from schemas.service import *
from utils.enums import Status

class ServiceService:

    def __init__(self, service_repository: ServicerRepository, category_repository: ServicerRepository):
        self.service_repository = service_repository
        self.category_repository = category_repository

    def get_all_service_filter_by(self, **filter_by):
        return self.service_repository.get_all_filter_by(**filter_by)
    
    def get_one_service_filter_by(self, **filter_by):
        return self.service_repository.get_one_filter_by(**filter_by)
    
    def get_all_category_filter_by(self, **filter_by):
        return self.category_repository.get_all_filter_by(**filter_by)
    
    def get_one_category_filter_by(self, **filter_by):
        return self.category_repository.get_one_filter_by(**filter_by)
    
    def create_category(self, data: CategoryCreate):
        category = self.category_repository.add(data.model_dump())
        if not category:
            return Status.FILLED.value
        return Status.SUCCESS.value, Category(id=category.id, name=category.name)
    
    def delete_category(self, id: int):
        return self.category_repository.delete(id)
    
    def update_category(self, id: int, data: CategoryUpdate):
        entity = data.model_dump()
        entity['id'] = id
        entity = {k: v for k, v in entity.items() if v is not None}
        return self.category_repository.update(entity)
    
    def create_service(self, data: ServiceCreate):

        service = self.service_repository.add(data.model_dump())
        if not service:
            return Status.FILLED.value
        return Status.SUCCESS.value
    
    def delete_service(self, id: int):
        return self.service_repository.delete(id)
    
    def update_service(self, id: int, data: ServiceUpdate):
        entity = data.model_dump()
        entity['id'] = id
        entity = {k: v for k, v in entity.items() if v is not None}
        return self.service_repository.update(entity)


