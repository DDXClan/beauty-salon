from dependencies import EmployeeRepository
from schemas.employee import EmployeeCreate, EmployeeUpdate


class EmployeeService:

    def __init__(self, employee_repository: EmployeeRepository):
        self.employee_repository = employee_repository

    def create_employee(self, employee_data: EmployeeCreate):
        employee_data.profession = employee_data.profession.value
        employee = self.employee_repository.add(employee_data.model_dump())
        return employee
    
    def get_all_filter_by(self, **filter_by):
        employees = self.employee_repository.get_all_filter_by(**filter_by)
        return employees
    
    def get_one_filter_by(self, **filter_by):
        employee = self.employee_repository.get_one_filter_by(**filter_by)
        return employee
    
    def update_employee(self, employee_id, data_update: EmployeeUpdate):
        data_update.status = data_update.status.value
        data = data_update.model_dump()
        data = {k: v for k, v in data.items() if v is not None}
        data['id'] = employee_id
        return self.employee_repository.update(data)


    def delete_employee(self, employee_id):
        return self.employee_repository.delete(employee_id)



