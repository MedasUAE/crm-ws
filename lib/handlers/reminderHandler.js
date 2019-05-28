const log = require('../logger');
const moment = require('moment');
const reminderModel = require('../models/reminder');
const remarkModel = require('../models/remark');

//  init reminderHandler
const reminderHandler = {};

/*
    createReminderHandler create new remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

reminderHandler.createReminderHandler = async function (req, res, next) {
    log.info("reminderHandler.js, Handlers: createReminderHandlerFileOpen")

    // let remainderFlag = true;
    let reminderDate = "";
    let condition = {};
    let reminderData = {};
    let remarkData = {};
    let reminderResult = {};
    let remarkResult = {};
    let results = {};
    console.log("******date:" + req.body.date);
    console.log(req.body);
    reminderDate = setReminderDate(req.body);
    console.log("***************reminderDate:" + reminderDate);
    condition = setCondition(req.body, reminderDate);
    try {
        reminder = await reminderModel.findOneRemainder(condition, {});
        // if (remainder && remainder.type == req.body.type && remainder.date == remainderDate) {
        //     remainderFlag = false;
        //     result = await reminderModel.updateRemainder(remainder._id, {status:'Close'});
        // }
        reminderData = setReminderData(req.body);
        reminderData["date"] = reminderDate;
        reminderData["message"] = setRemindarMessage(req.body.type);
        console.log(reminder);
        if (reminder) {
            result = await reminderModel.updateRemainder(reminder._id, reminderData);
            if (req.body.remark) remarkResult = await remarkModel.createRemark(remarkData);
            if (reminderResult) results.reminderResult = reminderResult;
            if (remarkResult) results.remarkResult = remarkResult;
            res.send(200, { data: results });
        }
        else {
            reminderResult = await reminderModel.createRemainder(reminderData);
            remarkData = setRemarkData(req.body);
            if (req.body.remark) remarkResult = await remarkModel.createRemark(remarkData);
            if (reminderResult) results.reminderResult = reminderResult;
            if (remarkResult) results.remarkResult = remarkResult;

            // if data exist and record found
            if (typeof results != "undefined") {
                res.send(200, { data: results });
            }

        }

        // //no data found in DB return 400 status code with error
        // else res.send(400, { error: "No reminder created" }); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, { error }); //ToDo Error Code
        //go to after handler
        return next();
    }
}



/*
    createTreatmentReminder create new Treatment remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

reminderHandler.createTreatmentReminder = async function (req, res, next) {
    log.info("reminderHandler.js, Handlers: createTreatmentReminder")
    let results = {};
    let remarkData = {};
    let reminderData = {};
    const arrayOfObjects = require("../../data/reminderSetup.json");

    try {
        let isServiceId = isServiceIdAvailable(arrayOfObjects, req.body.serviceId);
        if (isServiceId) {

                // washing, 10 days After Consultation
                let days = "10";
                reminderData = setReminderData(req.body);
                reminderData["date"] = setTreatmentDate(req.body,days);
                reminderData["message"] = "Washing reminder";
                remarkData = setRemarkData(req.body);
                remarkData["remark"] =  "Washing remark";
                washing = await reminderModel.createRemainder(reminderData);
                washingRemark = await remarkModel.createRemark(remarkData);
                results.washing = washing;
                results.washingRemark = washingRemark;

                // laser1,10 days After Consultation
                remarkData["remark"] = "First laser remark";
                reminderData["message"] = "First laser reminder";
                laser1 = await reminderModel.createRemainder(reminderData);
                laser1Remark = await remarkModel.createRemark(remarkData);
                 results.laser1 = laser1;
                 results.laser1Remark = laser1Remark;


                // medicine,10 days After Consultation
                remarkData["remark"] = "Medicine remark";
                reminderData["message"] = "Medicine collection reminder";
                medicine = await reminderModel.createRemainder(reminderData);
                medicineRemark = await remarkModel.createRemark(remarkData);
                 results.medicine = medicine;
                 results.medicineRemark = medicineRemark;

                   // laser2,35 days After Consultation
                remarkData["remark"] = "Second laser remark";
                days= "35";
                reminderData["date"] = setTreatmentDate(req.body,days);
                reminderData["message"] = "Second laser reminder";
                laser2 = await reminderModel.createRemainder(reminderData);
                laser2Remark = await remarkModel.createRemark(remarkData);
                 results.laser2 = laser2;
                 results.laser2Remark = laser2Remark;

                // Laser 3, 5 month  After Consultation
                 days = "150";
                 remarkData["remark"] = "3rd laser remark";
                 reminderData["date"] = setTreatmentDate(req.body,days);
                 reminderData["message"] = "3rd laser reminder";
                 laser3 = await reminderModel.createRemainder(reminderData);
                 laser3Remark = await remarkModel.createRemark(remarkData);
                  results.laser3 = laser3;
                  results.laser3Remark = laser3Remark;


            // if data exist and record found
            if (typeof results != "undefined") {
                res.send(200, { data: results });
            }
        } else {
            res.send(200, { data: 'No Reminder Created' });
        }
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, { error }); //ToDo Error Code
        //go to after handler
        return next();
    }
}

/*
    createAndCloseReminderHandler create new reminder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/
reminderHandler.createAndCloseReminderHandler = async function (req, res, next) {
    log.info("reminderHandler.js, Handlers: createAndCloseReminderHandler")
    // let  reminderData = {};
    let results = {};
    console.log("req.body.reminderId:" + req.body.reminderId);

    try {
        updateResult = await reminderModel.updateRemainder(req.body.reminderId, { status: 'Close' });
        reminderData = setReminderData(req.body);
        reminderData["date"] = req.body.nextDate;
        reminderData["message"] = setRemindarMessage(req.body.type);
        reminderResult = await reminderModel.createRemainder(reminderData);
        remarkData = setRemarkData(req.body);

        if (req.body.remark) remarkResult = await remarkModel.createRemark(remarkData);
        if (reminderResult) results.reminderResult = reminderResult;
        if (remarkResult) results.remarkResult = remarkResult;
        // if data exist and record found
        if (typeof results != "undefined") {
            res.send(200, { data: results });

        }


        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No reminder created" }); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, { error }); //ToDo Error Code
        //go to after handler
        return next();
    }
}

/*
    getOneReminderHandler find one remainder from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

reminderHandler.getOneReminderHandler = async function (req, res, next) {
    log.info("reminderHandler.js, Handlers: getOneReminderHandler");
    if (!req.params.id) {
        res.send(400, { error: "No Document ID found" });
        return next();
    }
    try {
        //get remainder from remainder collection
        result = await reminderModel.findOneRemainder({ customerId: req.params.id }, {});
        // if data exist and record found
        if (typeof result != "undefined") {
            // generate token and add to result

            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No remainder Found" }); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, { error }); //ToDo Error Code
        //go to after handler
        return next();
    }
}

/*
    updateReminderHandler update an existing remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

reminderHandler.updateReminderHandler = async function (req, res, next) {
    log.info("reminderHandler.js, Handlers: updateReminderHandler")
    let results = {};
    let id = req.body.reminderId;
   
    if (!id) {
        //no id found
        res.send(400, { error: "No ID Found" });
        //go to after handler
        return next();
    }
    
    try {
        reminderResult = await reminderModel.updateRemainder(id, { status: 'Close' });
        remarkData = setRemarkData(req.body);
         remarkResult = await remarkModel.createRemark(remarkData);
        results.reminderResult = reminderResult;
        results.remarkResult = remarkResult;
        
        // if data exist and record found
        if (typeof results != "undefined") {
            res.send(200, { data: results });
        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No reminder Found" }); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, { error }); //ToDo Error Code
        //go to after handler
        return next();
    }
}


/*
    searchReminderHandler search remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

reminderHandler.searchReminderHandler = async function (req, res, next) {
    log.info("reminderHandler.js, Handlers: searchReminderHandler")
    let condition = {};
    if (req.query.createdById) condition["createdBy.id"] = parseInt(req.query.createdById);
    // condition.status = 'Open';
    if (req.query.status && req.query.status != 'All') condition.status = req.query.status;

    if (req.query.date) condition.date = moment(req.query.date, "DD-MM-YYYY").format("DD-MM-YYYY");
    else condition.date = moment().format("DD-MM-YYYY");

    //    if (req.query.opNo) condition["patient.opNo"] = req.query.opNo;
    //    if (req.query.name) condition["patient.name"] = req.query.name;

    if (req.query.opNo) condition["patient.opNo"] = { '$regex': '.*' + req.query.opNo + '.*', $options: 'i' };
    if (req.query.name) condition["patient.name"] = { '$regex': '.*' + req.query.name + '.*', $options: 'i' };

    if (req.query.type && req.query.type != 'All') condition.type = req.query.type;
    console.log(condition);

    try {
        result = await reminderModel.searchRemainder(condition, {});
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No remainder Found" }); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, { error }); //ToDo Error Code
        //go to after handler
        return next();
    }
}

/*
    countReminderHandler count remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

reminderHandler.countReminderHandler = async function (req, res, next) {
    log.info("reminderHandler.js, Handlers: countReminderHandler")
    let condition = {};
    if (req.query.creatorid) condition["createdBy.id"] = parseInt(req.query.creatorid);
    if (req.query.date) condition.date = req.query.date;
    else condition.date = moment().format("DD-MM-YYYY");
    try {
        result = await reminderModel.countRemainder(condition);
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { count: result });
            // res.json({ count: count });
        }

        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No remainder Found" }); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, { error }); //ToDo Error Code
        //go to after handler
        return next();
    }
}

function setReminderDate(data) {

    if (data.nextDate && data.nextDate != "null") {
        console.log("*************next");
        return moment(data.nextDate, "DD-MM-YYYY").format("DD-MM-YYYY");
    }
    return moment(data.date, "DD-MM-YYYY").format("DD-MM-YYYY");



}

function setCondition(data, reminderDate) {
    let condition = {};
    if (data.opNo) condition["patient.opNo"] = data.opNo;
    if (data.date) condition.date = reminderDate;
    if (data.type) condition.type = data.type;
    condition.status = 'Open';
    return condition;
}

function setReminderData(data) {
    let reminderData = {};
    if (data.type) reminderData.type = data.type;
    reminderData.status = "Open";
    if (data.opNo) reminderData["patient.opNo"] = data.opNo;
    if (data.name) reminderData["patient.name"] = data.name;
    if (data.consultId) reminderData["patient.consultId"] = data.consultId;
    if (data.createdById) reminderData["createdBy.id"] = data.createdById;
    if (data.createdByName) reminderData["createdBy.name"] = data.createdByName;


    return reminderData;
}

function setRemarkData(data) {
    let remarkData = {};
    if (data.remark) remarkData.remark = data.remark;
    if (data.opNo) remarkData["patient.opNo"] = data.opNo;
    if (data.name) remarkData["patient.name"] = data.name;
    if (data.consultId) remarkData["patient.consultId"] = data.consultId;
    if (data.createdById) remarkData["createdBy.id"] = data.createdById;
    if (data.createdByName) remarkData["createdBy.name"] = data.createdByName;
    remarkData.date = moment().format("DD-MM-YYYY");

    return remarkData;
}

function setRemindarMessage(type) {
    switch (type) {
        case "FileOpen":
            return "File Open Reminder";

        case "Payment":
            return "payment  Reminder";
        // break;

        case "Treatment":
            return "Treatment  Reminder";


        case "Other":
            return

    }
}
function isServiceIdAvailable(arrayOfObjects, serviceId) {
    let isService = false;
   // arrayOfObjects.forEach(element => {
    for (let i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i].serviceId == serviceId) {
            isService = true;
              break;
        }
    }
   // });
    return isService;
}
function setTreatmentDate(data, days) {
    let treatmentDate = {};
    if (data.consultDate) treatmentDate["date"] = moment(data.consultDate).add(days, 'days').format("DD-MM-YYYY");
    return  moment(treatmentDate.date, "DD-MM-YYYY").format("DD-MM-YYYY");
}

module.exports = reminderHandler;
