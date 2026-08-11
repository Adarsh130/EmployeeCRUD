package com.EmployeeCRUD.entity;


import jakarta.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer emp_id;

    @Column(name ="emp_name")
    private String emp_name;

    @Column(name="emp_salary")
    private Float emp_salary;

    @Column(name="emp_age")
    private int age;

    @Column(name="emp_city")
    private String emp_city;

    public Employee() {

    }

    public Integer getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(int emp_id) {
        this.emp_id = emp_id;
    }

    public String getEmp_name() {
        return emp_name;
    }

    public void setEmp_name(String emp_name) {
        this.emp_name = emp_name;
    }

    public Float getEmp_salary() {
        return emp_salary;
    }

    public void setEmp_salary(Float emp_salary) {
        this.emp_salary = emp_salary;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmp_city() {
        return emp_city;
    }

    public void setEmp_city(String emp_city) {
        this.emp_city = emp_city;
    }



    @Override
    public String toString() {
        return "Employee{" +
                "emp_id=" + emp_id +
                ", emp_name='" + emp_name + '\'' +
                ", emp_salary=" + emp_salary +
                ", age=" + age +
                ", emp_city='" + emp_city + '\'' +
                '}';
    }
}
