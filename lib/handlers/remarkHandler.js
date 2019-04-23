const log = require('../logger');
const remarkModel = require('../models/remark');

//  init callHandler
const remarkHandler = {};

/*
    createRemarkHandler create new remark in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remarkHandler.createRemarkHandler = async function (req, res, next) {
    log.info("remarkHandler.js, Handlers: createRemarkHandler")
    let Obj = {};
    if (req.body.collectionName) Obj.collectionName = req.body.collectionName;
    if (req.body.createdBy) Obj.createdBy = req.body.createdBy;
    if (req.body.documentId) Obj.documentId = req.body.documentId;
    if (req.body.priviledge) Obj.priviledge = req.body.priviledge;
    if (req.body.remark) Obj.remark = req.body.remark;
    if (req.body.customerId) Obj.customerId = req.body.customerId;
    
   
    try {
        log.debug("getting call obejct to create" + JSON.stringify(Obj))
        result = await remarkModel.createRemark(Obj);
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No call created" }); //ToDo Error Code
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
    getOneRemarkHandler find one remark from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remarkHandler.getOneRemarkHandler = async function (req, res, next) {
    log.info("remarkHandler.js, Handlers: getOneRemarkHandler");
    try {
        //get clall from call collection
        result = await remarkModel.findOneRemark({ documentId: req.params.id }, {});
        // if data exist and record found
        if (typeof result != "undefined") {
            // generate token and add to result

            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No remark Found" }); //ToDo Error Code
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
    updateRemarkHandler update an existing call in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remarkHandler.updateRemarkHandler = async function (req, res, next) {
    log.info("remarkHandler.js, Handlers: updateRemarkHandler")
    let id =  req.body.id;
    if (!id) {
        //no id found
        res.send(400, { error: "No ID Found" });
        //go to after handler
        return next();
    }
    
    let obj = {};
    if (req.body.customerId) obj.customerId = req.body.customerId;
   

    try {
         result = await remarkModel.updateRemark(id, obj);
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });
        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No remark Found" }); //ToDo Error Code
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
    searchRemarkHandler search call in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remarkHandler.searchRemarkHandler = async function (req, res, next) {
    log.info("remarkHandler.js, Handlers: searchRemarkHandler")
    let condition = {};
     if (req.query.mobile) condition["mobile"] = req.query.mobile;
     if (req.query.name) condition["customerInfo.name"] = req.query.name;
    if (req.query.gender) condition["customerInfo.gender"] = req.query.gender;
    if (req.query.nationality) condition["customerInfo.nationality"] = req.query.nationality;
    if (req.query.createdBy) condition["createdBy.id"] = req.query.createdBy;
    if (req.query.followupDate) condition["followupDate"] = req.query.followupDate;
    if (req.query.status) condition["status"] = req.query.status;
    if (req.query.source) condition["source"] = req.query.source;
    if (req.query.callType) condition["callType"] = req.query.callType;
    if (req.query.alertType) condition["alertType"] = req.query.alertType;
    
    try {
         result = await remarkModel.searchRemark(condition, {});
        // if data exist and record found
        if (typeof result != "undefined") {
            res.send(200, { data: result });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No call Found" }); //ToDo Error Code
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

module.exports = remarkHandler;