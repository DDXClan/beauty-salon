from fastapi import APIRouter, Depends, HTTPException, Query
from dependencies import get_service_service, ServiceService
from schemas.service import CategoryCreate, CategoryUpdate, ServiceCreate, ServiceUpdate
from utils.enums import Status

router = APIRouter()

@router.post('/categories', status_code=201)
async def create_service(new_service: CategoryCreate, 
                         service_service: ServiceService = Depends(get_service_service)):
    service = service_service.create_category(new_service)
    if service == Status.FILLED.value:
        raise HTTPException(status_code=400, detail={'status': Status.FILLED.value})
    return {'status': Status.SUCCESS.value, 'category': new_service}

@router.get('/categories')
async def get_services(name: str | None = Query(None),
                       service_service: ServiceService = Depends(get_service_service)):
    filter = {}
    if name:
        filter['name'] = name
    return service_service.get_all_category_filter_by(**filter)

@router.get('/categories/{id}')
async def get_service(id: int, service_service: ServiceService = Depends(get_service_service)):
    category = service_service.get_all_category_filter_by(id=id)
    if not category or len(category) == 0:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    return category[0]


@router.delete('/categories/{id}')
async def delete_category(id: int, service_service: ServiceService = Depends(get_service_service)):
    category = service_service.get_all_category_filter_by(id=id)
    if not category or len(category) == 0:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    service_service.delete_category(id)
    return {'status': Status.SUCCESS.value}

@router.patch('/categories/{id}')
async def update_category(id: int, new_service: CategoryUpdate, 
                          service_service: ServiceService = Depends(get_service_service)):
    category = service_service.get_all_category_filter_by(id=id)
    if not category or len(category) == 0:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    update_category = service_service.update_category(id, new_service)
    return {'status': Status.SUCCESS.value, 'category': update_category}

@router.post('/', status_code=201)
async def create_service(new_service: ServiceCreate,
                            service_service: ServiceService = Depends(get_service_service)):
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
    return service_service.get_all_service_filter_by(**filter)

@router.get('/{id}')
async def get_service(id: int, service_service: ServiceService = Depends(get_service_service)):
    service = service_service.get_all_service_filter_by(id=id)
    if not service or len(service) == 0:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    return service[0]


@router.delete('/{id}')
async def delete_service(id: int, 
                          service_service: ServiceService = Depends(get_service_service)):
    service = service_service.get_all_service_filter_by(id=id)
    if not service or len(service) == 0:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    service_service.delete_service(id)
    return {'status': Status.SUCCESS.value}

@router.patch('/{id}')
async def update_service(id: int, new_service: ServiceUpdate,
                          service_service: ServiceService = Depends(get_service_service)):
    service = service_service.get_all_service_filter_by(id=id)
    if not service or len(service) == 0:
        return HTTPException(status_code=404, detail={'status': Status.NOT_FOUND.value})
    update_service = service_service.update_service(id, new_service)
    return {'status': Status.SUCCESS.value, 'service': update_service}
