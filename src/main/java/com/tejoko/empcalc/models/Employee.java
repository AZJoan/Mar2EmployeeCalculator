package com.tejoko.empcalc.models;

public class Employee {
    private String empId;
    private String empFName;
    private String empLName;
    private String empPos;
    private String empSalary;

    public Employee(String empId, String empFName, String empLName, String empPos, String empSalary) {
        this.empId = empId;
        this.empFName = empFName;
        this.empLName = empLName;
        this.empPos = empPos;
        this.empSalary = empSalary;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getEmpFName() {
        return empFName;
    }

    public void setEmpFName(String empFName) {
        this.empFName = empFName;
    }

    public String getEmpLName() {
        return empLName;
    }

    public void setEmpLName(String empLName) {
        this.empLName = empLName;
    }

    public String getEmpPos() {
        return empPos;
    }

    public void setEmpPos(String empPos) {
        this.empPos = empPos;
    }

    public String getEmpSalary() {
        return empSalary;
    }

    public void setEmpSalary(String empSalary) {
        this.empSalary = empSalary;
    }
}
