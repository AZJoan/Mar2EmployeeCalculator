var totSal = 0;  // total annual
var totMon =0;  // per month (total / 12)
var totBiM=0;  // twice a month (total / 24)
var totBiW=0;  // every 2 weeks (total / 26)

$(document).ready(function(){
    init();
});

function init(){
    enable();
    getEmployees();
}

function enable(){
    $("#btnAddEmp").on("click", postEmployee);
    $("#btnSearchId").on("click", searchEmployee);
    $("#btnSearchPos").on("click", searchEmployeeByPos);
}

function getEmployees(){
    $.ajax({
        type: "GET",
        url: "/getAllEmployees",
        success: function(response){
            appendEmps(response);
        }
    });
}

function postEmployee(event){
    event.preventDefault();

    var eId = $("#txtId").val();
    var eFName = $("#txtFName").val();
    var eLName = $("#txtLName").val();
    var ePos = $("#txtPos").text();
    var eSal = $("#txtSal").val();

    var newEmp = {
        empId: eId,
        empFName: eFName,
        empLName: eLName,
        empPos: ePos,
        empSalary: eSal
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(newEmp),
        url: "/add/employee",
        success: function(response){
            getEmployees();
        }
    });
}

function searchEmployee(event){
    event.preventDefault();

    var searchId = $("#txtId").val();
    $.ajax({
        type: "GET",
        url: "/getbyid/" + searchId,
        success: function(response){
            appendEmps(response);
        }
    });
}

function appendEmps(empArray){
    $("#container").empty();



    for(var i = 0; i < empArray.length; i++){
        var emp = empArray[i];

        totSal = totSal + parseInt(emp.empSalary);

        $("#container").append("<div></div>");
        var el = $("#container").children().last();
        el.append("<p>" + emp.empId + " - " +
            emp.empFName + " " +
            emp.empLName + " | " +
            emp.empPos + " | " +
            "$" + emp.empSalary +
            "</p>");
    }

    writeTotalLine();
}

function writeTotalLine(){

    totMon = totSal/12;  // per month (total / 12)
    totBiM = totSal/24;  // twice a month (total / 24)
    totBiW = totSal/26;  // every 2 weeks (total / 26)

    $("#totalline").empty();

    $("#totalline").append("<div></div>");
    var elt = $("#totalline").children().last();
    elt.append("<p>" + " Total Salary: $" + totSal + "</p>" +
    "<p>" + " Total Monthly: $" + totMon + "</p>" +
    "<p>" + " Total BiMonthly: $" + totBiM + "</p>" +
    "<p>" + " Total BiWeekly: $" + totBiW+ "</p>"
);
}

function searchEmployeeByPos(event){
    event.preventDefault();

    var searchPos = $("#txtSearchPos").text();
    $.ajax({
        type: "GET",
        url: "/getbypos/" + searchPos,
        success: function(response){
            appendEmpsByPos(response);
        }
    });
}

function appendEmpsByPos(empArray){
    $("#container").empty();
    for(var i = 0; i < empArray.length; i++){
        var emp = empArray[i];
        if (emp.empPos == findPos) {
            $("#container").append("<div></div>");
            var el = $("#container").children().last();
            el.append("<p>" + emp.empId + " - " +
                emp.empFName + " " +
                emp.empLName + " " +
                emp.empPos + " " +
                "$" + emp.empSalary +
                "</p>");
        }
    }
}