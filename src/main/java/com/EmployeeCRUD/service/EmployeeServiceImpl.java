package com.EmployeeCRUD.service;

import com.EmployeeCRUD.entity.Employee;
import com.EmployeeCRUD.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create new employee
    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all employees
    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    @Override
    public Optional<Employee> getEmployeeById(Long emp_id) {
        return employeeRepository.findById(emp_id);
    }

    // Update employee by ID
    @Override
    public Optional<Employee> updateEmployee(Long emp_id, Employee updatedEmployee) {
        Optional<Employee> existing = employeeRepository.findById(emp_id);
        if (existing.isPresent()) {
            Employee emp = existing.get();
            emp.setEmp_name(updatedEmployee.getEmp_name());
            emp.setEmp_salary(updatedEmployee.getEmp_salary());
            emp.setAge(updatedEmployee.getAge());
            emp.setEmp_city(updatedEmployee.getEmp_city());
            employeeRepository.save(emp);
            return Optional.of(emp);
        }
        return Optional.empty();
    }

    // Delete employee by ID
    @Override
    public boolean deleteEmployee(Long emp_id) {
        if (employeeRepository.existsById(emp_id)) {
            employeeRepository.deleteById(emp_id);
            return true;
        }
        return false;
    }

    // Delete all employees
    @Override
    public void deleteAllEmployees() {
        employeeRepository.deleteAll();
    }
}
