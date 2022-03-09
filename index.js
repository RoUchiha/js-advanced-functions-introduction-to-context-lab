// Your code here

function createEmployeeRecord(array) {
    const record = {}
    record.firstName = array[0]
    record.familyName = array[1]
    record.title = array[2]
    record.payPerHour = array[3]
    record.timeInEvents = []
    record.timeOutEvents = []

    return record
}


function createEmployeeRecords(nestedArray) {
    let recordsArray = [];
    for (const record of nestedArray) {
        recordsArray.push(createEmployeeRecord(record))
    }
    return recordsArray
}

function createTimeInEvent(record, date) {
    let datesplit = date.split(' ');
    let dayDate = datesplit[0];
    let timeDate = datesplit[1];
    let dayDateSplit = dayDate.split('-');
    let timeIn = {};
    timeIn.type = "TimeIn"
    timeIn.hour = parseInt(timeDate)
    timeIn.date = dayDate
    record.timeInEvents.push(timeIn);
    return record;
}

function createTimeOutEvent(record, date) {
    let datesplit = date.split(' ');
    let dayDate = datesplit[0];
    let timeDate = datesplit[1];
    let dayDateSplit = dayDate.split('-');
    let timeOut = {};
    timeOut.type = "TimeOut"
    timeOut.hour = parseInt(timeDate)
    timeOut.date = dayDate
    record.timeOutEvents.push(timeOut);
    return record;
}


function hoursWorkedOnDate(record, date) {
    let indates = record.timeInEvents;
    let outdates = record.timeOutEvents;
    let checkinTime;
    let checkoutTime;
    for (const timeIn of indates) {
        if (timeIn.date == date) {
            checkinTime = timeIn
        }
    }
    for (const timeOut of outdates) {
        if (timeOut.date == date) {
            checkoutTime = timeOut
        }
    }
    let hours = (checkoutTime.hour - checkinTime.hour) / 100
    return hours
}


function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date);
    let wages = (hours * (record.payPerHour))
    return wages
}

function allWagesFor(record) {
    let rawDates = record.timeOutEvents;
    let payDates = [];
    let wagesArray = [];
    for (const timeOut of rawDates) {
        payDates.push(timeOut.date)
    }
    let allWages = payDates.map(date => wagesEarnedOnDate(record, date))
    let totalWages = allWages.reduce(function(prev, curr) {
            return prev + curr
    }, 0)
    return totalWages
}

function findEmployeeByFirstName(recordsArray, firstName) {
    let match;
    for (const record of recordsArray) {
        if (record.firstName == firstName) {
            match = record
        }
    }
    return match
}


function calculatePayroll(employeeRecords) {
    let totalPayroll = []
    for (const record of employeeRecords) {
        totalPayroll.push(allWagesFor(record))
    }
    let wages = totalPayroll.reduce(function(prev, curr) {
        return prev + curr
    }, 0)
    return wages
}