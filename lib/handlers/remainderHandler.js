const log = require('../logger');
const moment = require('moment');
const remainderModel = require('../models/remainder');

//  init remainderHandler
const remainderHandler = {};

/*
    createRemainderHandlerFileOpen create new remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remainderHandler.createRemainderHandlerFileOpen = async function (req, res, next) {
    log.info("remainderHandler.js, Handlers: createRemainderHandlerFileOpen")

    let remainderFlag = true;
    let condition = {};
    if (req.body.customerId) condition.customerId = req.body.customerId;
    if (req.body.date) condition.date = moment(req.body.date).format("DD-MM-YYYY");
    if (req.body.type) condition.type = req.body.type;
    condition.status = 'Open';
    try {
        remainderList = await remainderModel.searchRemainder(condition, {});
        if (remainderList.length) {
           
            remainderList.forEach(remainder => {
                if (remainder.type == req.body.type && remainder.data == req.body.date) {
                    remainderFlag = false;
                }
            });

        }

        if (remainderFlag) {
            let remainderData = {
                date: moment(req.body.date).add(6, 'days').format("DD-MM-YYYY"),
                type: req.body.type,
                status: "Open",
               // status: "Close",
                message: "File Open Remainder",
                customerId: req.body.customerId
            }

            console.log(remainderFlag);
            result = await remainderModel.createRemainder(remainderData);
            // if data exist and record found
            if (typeof result != "undefined") {
                res.send(200, { data: result });

            }
        }

        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No remainder created" }); //ToDo Error Code
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
    createRemainderHandlerPayment create new remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/
remainderHandler.createRemainderHandlerPayment = async function (req, res, next) {
    log.info("remainderHandler.js, Handlers: createRemainderHandlerPayment")

    let condition = {};
    if (req.body.customerId) condition.customerId = req.body.customerId;
    if (req.body.date) condition.date = moment(req.body.date).format("DD-MM-YYYY");
    if (req.body.type) condition.type = req.body.type;
  
    try {
       // if payment status Open
        if (req.body.status == 'Open') {
            let remainderData = {
                date: moment(req.body.date).add(6, 'days').format("DD-MM-YYYY"),
                type: req.body.type,
                status: "Open",
                message: "Payment Remainder",
                customerId: req.body.customerId
            }

            result = await remainderModel.createRemainder(remainderData);
            // if data exist and record found
            if (typeof result != "undefined") {
                res.send(200, { data: result });

            }
        }

        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No remainder created" }); //ToDo Error Code
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
    getOneRemainderHandler find one remainder from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remainderHandler.getOneRemainderHandler = async function (req, res, next) {
    log.info("remainderHandler.js, Handlers: getOneRemainderHandler");
    if (!req.params.id) {
        res.send(400, { error: "No Document ID found" });
        return next();
    }
    try {
        //get remainder from remainder collection
        result = await remainderModel.findOneRemainder({ customerId: req.params.id }, {});
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
    updateRemainderHandler update an existing remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remainderHandler.updateRemainderHandler = async function (req, res, next) {
    log.info("remainderHandler.js, Handlers: updateRemainderHandler")
    let id = req.params.id;
    if (!id) {
        //no id found
        res.send(400, { error: "No ID Found" });
        //go to after handler
        return next();
    }
    let obj = {};
    if (req.body.date) obj.date = moment(req.body.date).format("DD-MM-YYYY");
    if (req.body.type) obj.type = req.body.type;
    if (req.body.status) obj.status = req.body.status;
    if (req.body.message) obj.message = req.body.message;
    if (req.body.customerId) obj.customerId = req.body.customerId;
    if (req.body.createdBy) obj.createdBy = req.body.createdBy;
    if (req.body.priviledge) obj.priviledge = req.body.priviledge;

    try {
        result = await remainderModel.updateRemainder(id, obj);
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
    searchRemainderHandler search remainder in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

remainderHandler.searchRemainderHandler = async function (req, res, next) {
    log.info("remainderHandler.js, Handlers: searchRemainderHandler")
    let condition = {};

    // if (!req.query.customerId) {
    //     res.send(400, { error: "No constomerId Found" }); //ToDo Error Code
    //     return next();
    // };
   if(req.query.customerId) condition.customerId = req.query.customerId;
   if(req.query.status) condition.status = req.query.status;
   if(req.query.date) condition.date =  moment(req.query.date).format("DD-MM-YYYY");

    try {
        result = await remainderModel.searchRemainder(condition, {});
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

module.exports = remainderHandler;
