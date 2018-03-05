var totSal = 0.00;  // total annual salary
var totMon =0.00;  // per month (total / 12)
var totBiM=0.00;  // twice a month (total / 24)
var totBiW=0.00;  // every 2 weeks (total / 26)
var numVal = "";
var empA = [];
var newCurr = "";

$(document).ready(function(){
    init();
});

function init(){
    enable();
    getEmployees();
}

function enable(){
    $("#btnAddEmp").on("click", postEmployee);
    $("#btnSearchId").on("click", searchEmpById);
    $("#btnSearchPos").on("click", getEmployeesByPos);
}

function postEmployee(event) {
    event.preventDefault();

    var eId = $("#txtId").val();
    var eFName = $("#txtFName").val();
    var eLName = $("#txtLName").val();
    var ePos = $("#txtPos :selected").val();
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
        success: function (response) {
            getEmployees();
        }
    });
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

function searchEmpById(event){
    event.preventDefault();

    var searchId = $("#txtSearchId").val();
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
    totSal = 0;
    empA = [];

    for(var j = 0; j < empArray.length; j++) {
        empA = empArray[j];
        totSal = totSal + parseInt(empA.empSalary);

        $("#container").append("<div class='row'></div>");
        var el = $("#container").children().last();
        el.append("<div class='col-md-2'></div>");
        el.append("<div class='col-md-2 card box'><p>" + empA.empId     + "</p></div>");
        el.append("<div class='col-md-2 card box'><p>" + empA.empFName + " " +
            empA.empLName + "</p></div>");
        el.append("<div class='col-md-2 card box'><p>" + empA.empPos    + "</p></div>");
        el.append("<div class='col-md-2 card box'><p>" + '$' + empA.empSalary + "</p></div>");
        el.append("<div class='col-md-2'></div>");
    }

    writeTotalLine();
}

function writeTotalLine(){
    totMon=0;
    totBiM=0;
    totBiW=0;
    totMon = totSal/12;  // per month (total / 12)
    totBiM = totSal/24;  // twice a month (total / 24)
    totBiW = totSal/26;  // every 2 weeks (total / 26)

    numVal = totSal.toString();
    $.ajax({
        type: "GET",
        url: "/currency/" + numVal,
        success: function (newCurr) {
            $("#TSal").text(newCurr);
        }
    });

    numVal = totMon.toString();
    $.ajax({
        type: "GET",
        url: "/currency/" + numVal,
        success: function (newCurr) {
            $("#TMon").text(newCurr);
        }
    });

    numVal = totBiM.toString();
    $.ajax({
        type: "GET",
        url: "/currency/" + numVal,
        success: function (newCurr) {
            $("#TBiM").text(newCurr);
        }
    });

    numVal = totBiW.toString();
    $.ajax({
        type: "GET",
        url: "/currency/" + numVal,
        success: function (newCurr) {
            $("#TBiW").text(newCurr);
        }
    });

}

function getEmployeesByPos(){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "/getAllEmployees",
        success: function(response){
           appendEmpsByPos(response);
        }
    });
}
function appendEmpsByPos(empArray){

    $("#container").empty();
    totSal = 0;
    empA = [];

    var findPos = $("#txtSearchPos :selected").val();

    for(var i = 0; i < empArray.length; i++){
        empA = empArray[i];

        if (empA.empPos == findPos) {
            totSal = totSal + parseInt(empA.empSalary);

            $("#container").append("<div class='row'></div>");
            var el = $("#container").children().last();
            el.append("<div class='col-md-2'></div>");
            el.append("<div class='col-md-2 card box'><p>" + empA.empId     + "</p></div>");
            el.append("<div class='col-md-2 card box'><p>" + empA.empFName + " " +
               empA.empLName + "</p></div>");
            el.append("<div class='col-md-2 card box'><p>" + empA.empPos    + "</p></div>");
            el.append("<div class='col-md-2 card box'><p>" + '$' + empA.empSalary + "</p></div>");
            el.append("<div class='col-md-2'></div>");

        }
    }
    writeTotalLine();
}

