package com.EmployeeCRUD.controller;

import com.EmployeeCRUD.entity.Employee;
import com.EmployeeCRUD.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Create employee
    @PostMapping("/employees")
    public ResponseEntity<Employee> createNewEmployee(@RequestBody Employee employee) {
        Employee saved = employeeService.createEmployee(employee);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Read all employees
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        List<Employee> empList = employeeService.getAllEmployees();
        return new ResponseEntity<>(empList, HttpStatus.OK);
    }

    // Read employee by ID
    @GetMapping("/employees/{emp_id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long emp_id) {
        Optional<Employee> emp = employeeService.getEmployeeById(emp_id);
        return emp.map(e -> new ResponseEntity<>(e, HttpStatus.OK))
                  .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update employee by ID
    @PutMapping("/employees/{emp_id}")
    public ResponseEntity<Object> updateEmployeeById(@PathVariable Long emp_id,
                                                      @RequestBody Employee employee) {
        Optional<Employee> updated = employeeService.updateEmployee(emp_id, employee);
        if (updated.isPresent()) {
            return new ResponseEntity<>(updated.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("Employee not found with id: " + emp_id, HttpStatus.NOT_FOUND);
    }

    // Delete employee by ID
    @DeleteMapping("/employees/{emp_id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable Long emp_id) {
        boolean deleted = employeeService.deleteEmployee(emp_id);
        if (deleted) {
            return new ResponseEntity<>("Employee deleted successfully with id: " + emp_id, HttpStatus.OK);
        }
        return new ResponseEntity<>("Employee not found with id: " + emp_id, HttpStatus.NOT_FOUND);
    }

    // Delete all employees
    @DeleteMapping("/employees")
    public ResponseEntity<String> deleteAllEmployee() {
        employeeService.deleteAllEmployees();
        return new ResponseEntity<>("All employees deleted successfully", HttpStatus.OK);
    }
}
