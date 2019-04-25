const log = require('../logger');
const customerModel = require('../models/customer');

// customer init
const customer = {};

/*
    createCustomerHandler create new customer in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

customer.createCustomerHandler = async function(req,res,next) {
    log.info("customerHandler.js, Handlers: createCustomerHandler")
    let customerObj = {};
    if(req.body.demography) customerObj.demography = req.body.demography;
    if(req.body.contact) customerObj.contact = req.body.contact;
     if(req.body.coordinator) customerObj.coordinator = req.body.coordinator;
     if(req.body.fileOpen) customerObj.fileOpen = req.body.fileOpen;
    if(req.body.source) customerObj.source = req.body.source;
    if(req.body.createdBy) customerObj.createdBy = req.body.createdBy;
    if(req.body.officeId) customerObj.officeId = req.body.officeId; 
    try {
        log.debug("getting customer obejct to create" + JSON.stringify(customerObj))
        result = await customerModel.createCustomer(customerObj);
         // if data exist and record found
         if(typeof result != "undefined") {
            log.debug("auth.js, getToken")
            // generate token and add to result

            res.send(200, {data: result});
            
        }
        //no data found in DB return 400 status code with error
        else res.send(400, {error: "No Customer created"}); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, {error}); //ToDo Error Code
        //go to after handler
        return next();
    }
}

/*
    getOneCustomerHandler find one customer from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

customer.getOneCustomerHandler = async function (req, res, next) {
    log.info("userHandler.js, Handlers: getOneCustomerHandler");
     try {
        //get user from user collection
        result = await customerModel.findOneCustomer({_id: req.params.id},{});
        // if data exist and record found
        if (typeof result != "undefined") {
              // generate token and add to result

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


/*
    updateCustomerHandler update an existing customer in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

customer.updateCustomerHandler = async function(req,res,next) {
    //const customers = require('../models/customer');
    log.info("customerHandler.js, Handlers: updateCustomerHandler")
    let id = req.params.id;
    if(!id) {
        //no id found
        res.send(400, {error: "No ID Found"});
        //go to after handler
        return next();
    }
    
     let customerObj = {};
     console.log(req.body.demography);
     if(req.body.demography) customerObj.demography = req.body.demography;
     if(req.body.contact) customerObj.contact = req.body.contact;
     if(req.body.coordinator) customerObj.coordinator = req.body.coordinator;
     if(req.body.fileOpen) customerObj.fileOpen = req.body.fileOpen;
     if(req.body.source) customerObj.source = req.body.source;
     if(req.body.createdBy) customerObj.coordinator = req.body.createdBy;
     if(req.body.officeId) customerObj.officeId = req.body.officeId;
   
    try {
        //get user from user collection
          result = await customerModel.updateCustomer(id,customerObj);
         // if data exist and record found
         if(typeof result != "undefined") {
            res.send(200, {data: result}); 
        }
        //no data found in DB return 400 status code with error
        else res.send(400, {error: "No Customer Found"}); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, {error}); //ToDo Error Code
        //go to after handler
        return next();
    }
}


/*
    searchCustomerHandler search customer in the DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/ 

customer.searchCustomerHandler = async function(req,res,next) {
    log.info("customerHandler.js, Handlers: searchCustomerHandler")
    let condition = {};
    if(req.query.fullName)  condition["demography.fullName"] =  {'$regex': '.*'+req.query.fullName+'.*',$options: 'i'};
    if(req.query.residenceId)  condition["demography.residenceId"] =  {'$regex': '.*'+req.query.residenceId+'.*',$options: 'i'};
   
    if(req.query.opNo)  condition["demography.opNo"] =  req.query.opNo;
   if(req.query.mobile)  condition["contact.mobile"] =  req.query.mobile;
   // if(req.query.mobile)  condition["contact.mobile"] =  {'$regex': '.*'+req.query.mobile+'.*',$options: 'i'};
   
  
    if(req.query.customerId)  condition["_id"] =  req.query.customerId;
      try {  
         result = await customerModel.searchCustomer(condition,{});
         // if data exist and record found
         if(typeof result != "undefined") {
            res.send(200, {data: result});
            
        }
        //no data found in DB return 400 status code with error
        else res.send(400, {error: "No Customer Found"}); //ToDo Error Code
        //go to after handler
        return next();
    } catch (error) {
        log.error(error);
        //error when getting data from mysql DB
        res.send(400, {error}); //ToDo Error Code
        //go to after handler
        return next();
    }
}


module.exports = customer;
