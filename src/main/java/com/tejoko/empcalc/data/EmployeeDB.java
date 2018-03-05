package com.tejoko.empcalc.data;

import com.tejoko.empcalc.models.Employee;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeDB {

    // declare the array
    private List<Employee> empList = new ArrayList<>();

    // get all employees
    public List<Employee> getAllEmployees() {
        return empList;
    }

    // add an employee to array list
    public void addEmployee(Employee employee) {
        empList.add(employee);
    }

    // find an employee by empId
    public Employee findEmployeeById(String id) {
        for (Employee oneEmp : empList) {
            if (oneEmp.getEmpId().equalsIgnoreCase(id)) {
                return oneEmp;
            }
        }
        return null;
    }
}
