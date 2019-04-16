const log = require('../logger');
const noteModel = require('../models/note');

// note init
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
    if (req.body.message) noteObj.message = req.body.message;
    if (req.body.createdBy) noteObj.createdBy = req.body.createdBy;
    if (req.body.customer_id) noteObj.customer_id = req.body.customer_id;
    if (req.body.user_id) noteObj.user_id = req.body.user_id;
    if (req.body.createdDate) noteObj.createdDate = req.body.createdDate;
    if (req.body.remainderDate) noteObj.remainderDate = req.body.remainderDate;
    if (req.body.remarks) noteObj.remarks = req.body.remarks;
    if (req.body.status) noteObj.status = req.body.status;
    if (req.body.type) noteObj.type = req.body.type;
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
    getOneNoteHandler find one note from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

note.getOneNoteHandler = async function (req, res, next) {
    log.info("noteHandler.js, Handlers: getOneNoteHandler");
    try {
        //get note from note collection
        result = await noteModel.findOneNote({ _id: req.params.id }, {});
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
    if (req.body.message) noteObj.message = req.body.message;
    if (req.body.createdBy) noteObj.createdBy = req.body.createdBy;
    if (req.body.customer_id) noteObj.customer_id = req.body.customer_id;
    if (req.body.user_id) noteObj.user_id = req.body.user_id;
    if (req.body.createdDate) noteObj.createdDate = req.body.createdDate;
    if (req.body.remainderDate) noteObj.remainderDate = req.body.remainderDate;
    if (req.body.remarks) noteObj.remarks = req.body.remarks;
    if (req.body.status) noteObj.status = req.body.status;
    if (req.body.type) noteObj.type = req.body.type;

    try {
        //get user from user collection
        result = await noteModel.updateNote(id, noteObj);
        // if data exist and record found
        if (typeof result != "undefined") {
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
    searchNoteHandler search note in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

note.searchNoteHandler = async function (req, res, next) {
    log.info("noteHandler.js, Handlers: searchNoteHandler")
    let condition = {};
    if (req.query.customer_id) condition["customer_id"] = req.query.customer_id;
    if (req.query.user_id) condition["user_id"] = req.query.user_id;
    if (req.query.createdBy) condition["createdBy.id"] = req.query.createdBy;
    if (req.query.remainderDate) condition["remainderDate"] = req.query.remainderDate;
    if (req.query.status) condition["status"] = req.query.status;
    if (req.query.type) condition["type"] = req.query.type;
    try {
        result = await noteModel.searchNote(condition, {});
        // if data exist and record found
        if (typeof result != "undefined") {
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

module.exports = note;
