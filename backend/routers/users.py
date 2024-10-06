from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import UserService, get_user_service, get_current_user, OrderService, get_order_service, ServiceService, get_service_service
from schemas.users import UserResponse
from utils.enums import AuthStatus, OrderStatus
from schemas.orders import Order
from schemas.service import Category, Service

router = APIRouter()

@router.get('/me')
async def get_me(user_service: UserService = Depends(get_user_service), user = Depends(get_current_user)):
    user_info = user_service.get_user_filter_by(id=user.id)
    if not user_info:
        raise HTTPException(status_code=404, detail={'status': AuthStatus.USER_NOT_FOUND.value})
    return UserResponse(id=user_info.id, username=user_info.username, phone_number=user_info.phone_number, image=user_info.image)


@router.get('/me/orders')
async def get_order(id: int | None = Query(None), 
                    status: OrderStatus | None = Query(None),
                    order_service: OrderService = Depends(get_order_service), 
                    service_service: ServiceService = Depends(get_service_service), 
                    user = Depends(get_current_user)):
    filters = {}
    if status:
        filters['status'] = status.value
    if id:
        filters['id'] = id
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
                                                              ),
                            appointment_time=order.appointment_time,
                            total_price=order.total_price,
                            status=order.status,
                            finished_at=order.finished_at))
    return orders



