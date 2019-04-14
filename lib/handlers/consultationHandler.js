const log = require('../logger');
const consultations = require('../models/consultation');

// consultation init
const consultation = {};

/*
    createConsultationHandler create new customer in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

consultation.createConsultationHandler = async function (req, res, next) {
    log.info("consultationHandler.js, Handlers: createConsultationHandler")
    let consultationObj = {};
    if (req.body.customer_id) consultationObj.customer_id = req.body.customer_id;
    if (req.body.date) consultationObj.date = req.body.date;
    if (req.body.time) consultationObj.time = req.body.time;
    if (req.body.payment) consultationObj.payment = req.body.payment;
    if (req.body.installments) consultationObj.installments = req.body.installments;
    if (req.body.medicalsummary) consultationObj.medicalsummary = req.body.medicalsummary;
    if (req.body.noOfHair) consultationObj.noOfHair = req.body.noOfHair;
    try {
        log.debug("getting customer obejct to create" + JSON.stringify(consultationObj))
        result = await consultations.createConsultation(consultationObj);
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No customer created" }); //ToDo Error Code
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
    getConsultationHandler find all consultation from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

consultation.getConsultationHandler = async function (req, res, next) {
    log.info("consultationHandler.js, Handlers: getConsultationHandler")
    try {
        //get user from user collection

        result = await consultations.getConsultations();
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No consultation Found" }); //ToDo Error Code
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
    updateConsultationHandler update an existing consultation in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

consultation.updateConsultationHandler = async function (req, res, next) {
    log.info("consultationHandler.js, Handlers: updateConsultationHandler")
    let id = req.params.id;
    if (!id) {
        //no id found
        res.send(400, { error: "No ID Found" });
        //go to after handler
        return next();
    }

    let consultationObj = {};
    if (req.body.customer_id) consultationObj.customer_id = req.body.customer_id;
    if (req.body.date) consultationObj.date = req.body.date;
    if (req.body.time) consultationObj.time = req.body.time;
    if (req.body.payment) consultationObj.payment = req.body.payment;
    if (req.body.installments) consultationObj.installments = req.body.installments;
    if (req.body.medicalsummary) consultationObj.medicalsummary = req.body.medicalsummary;
    if (req.body.noOfHair) consultationObj.noOfHair = req.body.noOfHair;

    try {
        //get user from user collection
        result = await consultations.updateConsultation(id, consultationObj);
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });
        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No Consultation Found" }); //ToDo Error Code
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
    searchConsultationHandler search consultations in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

consultation.searchConsultationHandler = async function (req, res, next) {
    log.info("consultationHandler.js, Handlers: searchConsultationHandler")
    let condition = {};
    if (req.query.date) condition["date"] = req.query.date;
    //  if(req.query.residenceId)  condition["opNo"] =  req.query.opNo;
    // if(req.query.coordinator)  condition["coordinator.userId"] =  req.query.userId;
    console.log("*********date:" + req.query.date);
    try {
        result = await consultations.searchConsultation(condition, {});
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No Customer Found" }); //ToDo Error Code
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

module.exports = consultation;
