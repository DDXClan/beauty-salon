from dependencies import OrderRepository
from schemas.orders import OrderUpdate
class OrderService: 

    def __init__(self, order_repository: OrderRepository):
        self.order_repository = order_repository 

    def create_order(self, user_id: int, service_id: int, appointment_time):
        order = self.order_repository.add({"user_id": user_id, "service_id": service_id, 'appointment_time': appointment_time })
        return order
    
    def get_all_filter_by(self, **filter_by):
        orders = self.order_repository.get_all_filter_by(**filter_by)
        return orders
    
    def get_one_filter_by(self, **filter_by):
        order = self.order_repository.get_one_filter_by(**filter_by)
        return order
    
    def update_order(self, order_id, data_update: OrderUpdate):
        data_update.status = data_update.status.value
        data = data_update.model_dump()
        data = {k: v for k, v in data.items() if v is not None}
        data['id'] = order_id
        return self.order_repository.update(data)