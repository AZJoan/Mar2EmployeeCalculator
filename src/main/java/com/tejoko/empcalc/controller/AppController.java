package com.tejoko.empcalc.controller;

import com.tejoko.empcalc.data.EmployeeDB;
import com.tejoko.empcalc.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class AppController {

    @Autowired
    private EmployeeDB employeeDB;

    @RequestMapping("/getAllEmployees")
    public @ResponseBody
    List<Employee> getAllEmployees(){
        return employeeDB.getAllEmployees();
    }

    @RequestMapping("/currency/{numval}")
    public @ResponseBody String formatNumToCurr(@PathVariable String numval) {
        double dVal = Double.parseDouble(numval);
        NumberFormat nformat = NumberFormat.getCurrencyInstance();
        String formatcurr = nformat.format(dVal);
        return formatcurr;
    }

    @RequestMapping("/getbyid/{id}")
    public @ResponseBody List<Employee> findEmployeeById(@PathVariable String id){
        Employee foundEmpId = employeeDB.findEmployeeById(id);
        List<Employee> responseIdArr = new ArrayList<>();
        responseIdArr.add(foundEmpId);
        return responseIdArr;
    }

//    @RequestMapping("/getbypos/{pos}")
//    public @ResponseBody List<Employee> findEmployeeByPos(@PathVariable String pos){
//        System.out.println("inside getbypos");
//        Employee foundEmpPos = employeeDB.findEmployeeByPos(pos);
//        List<Employee> responsePosArr = new ArrayList<>();
//        responsePosArr.add(foundEmpPos);
//        System.out.println("right before return array");
//        System.out.println("responsePosArr" + responsePosArr);
//        return responsePosArr;
//    }

    @RequestMapping(value = "/add/employee", method = RequestMethod.POST)
    public @ResponseBody Employee postEmployee(@RequestBody Map<String, Object> payload){
        String newId = String.valueOf(payload.get("empId"));
        String newFName = String.valueOf(payload.get("empFName"));
        String newLName = String.valueOf(payload.get("empLName"));
        String newPos = String.valueOf(payload.get("empPos"));
        String newSal= String.valueOf(payload.get("empSalary"));

        Employee newEmployee = new Employee(newId, newFName, newLName, newPos, newSal);
        employeeDB.addEmployee(newEmployee);
        return newEmployee;
    }

    @RequestMapping("/")
    public String baseRoute(){
        return "index";
    }
}
