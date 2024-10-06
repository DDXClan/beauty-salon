from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import get_service_service, ServiceService, get_current_admin, get_current_user, get_review_service, ReviewService, get_user_service, UserService
from schemas.service import CategoryCreate, CategoryUpdate, ServiceCreate, ServiceUpdate, Service, Category
from schemas.reviews import ReviewCreate, Review, ReviewUpdate, UserResponse
from utils.enums import Status

router = APIRouter()

@router.post('/categories', status_code=201)
async def create_service(new_service: CategoryCreate, 
                         service_service: ServiceService = Depends(get_service_service), user = Depends(get_current_admin)):
    service = service_service.create_category(new_service)
    if service == Status.FILLED.value:
        raise HTTPException(status_code=400, detail={'status': Status.FILLED.value})
    return {'status': Status.SUCCESS.value, 'category': new_service}

@router.get('/categories')
async def get_categories(name: str | None = Query(None),
                       service_service: ServiceService = Depends(get_service_service)):
    filter = {}
    if name:
        filter['name'] = name
    return service_service.get_all_category_filter_by(**filter)

@router.get('/categories/{id}')
async def get_category(id: int, service_service: ServiceService = Depends(get_service_service)):
    category = service_service.get_one_category_filter_by(id=id)
    if not category:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    return category


@router.delete('/categories/{id}')
async def delete_category(id: int, service_service: ServiceService = Depends(get_service_service), user = Depends(get_current_admin)):
    category = service_service.get_one_category_filter_by(id=id)
    if not category:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    service_service.delete_category(id)
    return {'status': Status.SUCCESS.value}

@router.patch('/categories/{id}')
async def update_category(id: int, new_service: CategoryUpdate, 
                          service_service: ServiceService = Depends(get_service_service), user = Depends(get_current_admin)):
    category = service_service.get_one_category_filter_by(id=id)
    if not category:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    update_category = service_service.update_category(id, new_service)
    return {'status': Status.SUCCESS.value, 'category': update_category}

@router.post('/', status_code=201)
async def create_service(new_service: ServiceCreate,
                         service_service: ServiceService = Depends(get_service_service), user = Depends(get_current_admin)):
    service = service_service.create_service(new_service)
    if service == Status.FILLED.value:
        raise HTTPException(status_code=400, detail={'status': Status.FILLED.value})
    return {'status': Status.SUCCESS.value, 'service': new_service}

@router.get('/')
async def get_services(name: str | None = Query(None),
                       service_service: ServiceService = Depends(get_service_service)):
    filter = {}
    if name:
        filter['name'] = name
    services = service_service.get_all_service_filter_by(**filter)
    response = []
    for service in services:
        category = service_service.get_one_category_filter_by(id=service.category_id)
        response.append(Service(id=service.id,
                                name=service.name,
                                category=Category(id=category.id,
                                                  name=category.name,
                                                  description=category.description),
                                start_price=service.start_price,
                                end_price=service.end_price,
                                description=service.description))
    return response



@router.get('/{id}')
async def get_service(id: int, service_service: ServiceService = Depends(get_service_service)):
    service = service_service.get_one_service_filter_by(id=id)
    if not service:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    category = service_service.get_one_category_filter_by(id=service.category_id)
    return Service(
                id=service.id,
                name=service.name,
                category=Category(id=category.id,
                                    name=category.name,
                                    description=category.description),
                start_price=service.start_price,
                end_price=service.end_price,
                description=service.description)


@router.delete('/{id}')
async def delete_service(id: int, 
                          service_service: ServiceService = Depends(get_service_service), user = Depends(get_current_admin)):
    service = service_service.get_one_service_filter_by(id=id)
    if not service:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    service_service.delete_service(id)
    return {'status': Status.SUCCESS.value}


@router.patch('/{id}')
async def update_service(id: int, new_service: ServiceUpdate,
                          service_service: ServiceService = Depends(get_service_service), user = Depends(get_current_admin)):
    service = service_service.get_one_service_filter_by(id=id)
    if not service:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    update_service = service_service.update_service(id, new_service)
    return {'status': Status.SUCCESS.value, 'service': update_service}


