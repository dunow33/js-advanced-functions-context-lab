/* Your Code Here */
function createEmployeeRecord(empArray){
    let empRecord = {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return empRecord;
}

function createEmployeeRecords(empArray){
    let empRecord = empArray.map(emp => createEmployeeRecord(emp));

    return empRecord;
}

function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
    
    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour),
    });

    return this;
}

function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
    
    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour),
    });

    return this;
}

function hoursWorkedOnDate(date) {
    let end = this.timeOutEvents.find(emp => emp.date === date);
    let start = this.timeInEvents.find(emp => emp.date === date);

    return (end.hour - start.hour)/100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(arr) {
    return arr.reduce(function(total, employee) {
        return total + allWagesFor.call(employee);
    }, 0);
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}