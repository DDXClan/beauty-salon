from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import get_current_user, get_order_service, OrderService, get_current_admin, get_service_service, ServiceService
from schemas.orders import OrderCreate, OrderUpdate, Order
from schemas.service import Category, Service
from utils.enums import Status, OrderStatus


router = APIRouter()

@router.post('/', status_code=201)
def create_order(order: OrderCreate, order_service: OrderService = Depends(get_order_service), user = Depends(get_current_user)):
    order = order_service.create_order(user.id, order.service_id, order.appointment_time)
    if not order:
        raise HTTPException(status_code=400, detail={'status': Status.FILLED.value})
    return {
        'status': Status.SUCCESS.value,
        'id': order.id,
        'appointment_time': order.appointment_time,
        'order_status': OrderStatus.PENDING.value
    }

@router.get('/')
def get_orders(id: int | None = Query(None),
               status: OrderStatus | None = Query(None),
               user_id: int | None = Query(None),
               order_service: OrderService = Depends(get_order_service), 
               service_service: ServiceService = Depends(get_service_service),
               user = Depends(get_current_admin)):
    filters = {}
    if id: filters['id'] = id
    if status: filters['status'] = status.value
    if user_id: filters['user_id'] = user_id
    orders = list()
    for order in order_service.get_all_filter_by(**filters):
        service = service_service.get_one_service_filter_by(id=order.service_id)
        category = service_service.get_one_category_filter_by(id=service.category_id)
        orders.append(Order(id=order.id, 
                            service=Service(id=service.id, 
                                            name=service.name, 
                                            category=Category(id=category.id,
                                                              name=category.name,
                                                              description=category.description),
                                            description=service.description,
                                            start_price=service.start_price,
                                            end_price=service.end_price,
                                            image=service.image),
                            appointment_time=order.appointment_time,
                            total_price=order.total_price,
                            status=order.status,
                            finished_at=order.finished_at))
    return orders



@router.patch('/{order_id}')
def update_order(order_id: int, data_update: OrderUpdate, order_service: OrderService = Depends(get_order_service), user = Depends(get_current_user)):
    order = order_service.get_one_filter_by(id=order_id)
    if not order:
        raise HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    order_update = order_service.update_order(order_id, data_update)
    return {'status': Status.SUCCESS.value, 'update_field': order_update}


