const log = require('../logger');
const noteModel = require('../models/note');

// consultation init
const note = {};

/*
    createNoteHandler create new note in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

note.createNoteHandler = async function (req, res, next) {
    log.info("noteHandler.js, Handlers: createNoteHandler")
    let noteObj = {};
    if (req.body.customer_id) noteObj.customer_id = req.body.customer_id;
    if (req.body.date) noteObj.date = req.body.date;
    if (req.body.message) noteObj.message = req.body.message;
    if (req.body.priviledge) noteObj.priviledge = req.body.priviledge;
    if (req.body.createdBy) noteObj.createdBy = req.body.createdBy;
    if (req.body.acknowledged) noteObj.acknowledged = req.body.acknowledged;
    try {
        log.debug("getting note obejct to create" + JSON.stringify(noteObj))
        result = await noteModel.createNote(noteObj);
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No note created" }); //ToDo Error Code
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
    getOneConsultationHandler find one consultation from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

note.getOneNoteHandler = async function (req, res, next) {
    log.info("noteHandler.js, Handlers: getOneNoteHandler");
     try {
        //get user from user collection
        result = await noteModel.findOneNote({_id: req.params.id},{});
        // if data exist and record found
        if (typeof result != "undefined") {
              // generate token and add to result

            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No note Found" }); //ToDo Error Code
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
    updateNoteHandler update an existing note in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

note.updateNoteHandler = async function (req, res, next) {
    log.info("noteHandler.js, Handlers: updateNoteHandler")
    let id = req.params.id;
    if (!id) {
        //no id found
        res.send(400, { error: "No ID Found" });
        //go to after handler
        return next();
    }

    let noteObj = {};
    if (req.body.customer_id) noteObj.customer_id = req.body.customer_id;
    if (req.body.date) consultationObj.date = req.body.date;
    if (req.body.time) consultationObj.time = req.body.time;
    if (req.body.payment) consultationObj.payment = req.body.payment;
    if (req.body.installments) consultationObj.installments = req.body.installments;
    if (req.body.medicalsummary) consultationObj.medicalsummary = req.body.medicalsummary;
    if (req.body.noOfHair) consultationObj.noOfHair = req.body.noOfHair;

    try {
        //get user from user collection
        result = await noteModel.updateConsultation(id, consultationObj);
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


// /*
//     searchConsultationHandler search consultations in the DB 
//     @params:    req: request object, 
//                 res: response object, 
//                 next: callback method,        
// */

// note.searchConsultationHandler = async function (req, res, next) {
//     log.info("noteHandler.js, Handlers: searchConsultationHandler")
//     let condition = {};
//     if (req.query.date) condition["date"] = req.query.date;
//     //  if(req.query.residenceId)  condition["opNo"] =  req.query.opNo;
//     // if(req.query.coordinator)  condition["coordinator.userId"] =  req.query.userId;
//     console.log("*********date:" + req.query.date);
//     try {
//         result = await noteModel.searchConsultation(condition, {});
//         // if data exist and record found
//         if (typeof result != "undefined") {
//             res.send(200, { data: result });

//         }
//         //no data found in DB return 400 status code with error
//         else res.send(400, { error: "No Customer Found" }); //ToDo Error Code
//         //go to after handler
//         return next();
//     } catch (error) {
//         log.error(error);
//         //error when getting data from mysql DB
//         res.send(400, { error }); //ToDo Error Code
//         //go to after handler
//         return next();
//     }
// }

module.exports = note;
