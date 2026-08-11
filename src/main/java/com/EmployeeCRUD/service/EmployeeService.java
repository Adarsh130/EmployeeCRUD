package com.EmployeeCRUD.service;

import com.EmployeeCRUD.entity.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    // Create
    Employee createEmployee(Employee employee);

    // Read all
    List<Employee> getAllEmployees();

    // Read by ID
    Optional<Employee> getEmployeeById(Long emp_id);

    // Update
    Optional<Employee> updateEmployee(Long emp_id, Employee employee);

    // Delete by ID
    boolean deleteEmployee(Long emp_id);

    // Delete all
    void deleteAllEmployees();
}
