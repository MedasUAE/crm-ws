const log = require('../logger');
const customers = require('../models/customer');

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
        result = await customers.createCustomer(customerObj);
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
          result = await customers.updateCustomer(id,customerObj);
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
  //  const customers = require('../models/customer');
    let condition = {};
    if(req.query.fullName)  condition["demography.fullName"] =  req.query.fullName;
    if(req.query.residenceId)  condition["demography.residenceId"] =  req.query.residenceId;
    if(req.query.opNo)  condition["demography.opNo"] =  req.query.opNo;
    if(req.query.mobile)  condition["contact.mobile"] =  req.query.mobile;
    if(req.query.coordinator)  condition["coordinator"] =  req.query.coordinator;
      try {  
         result = await customers.searchCustomer(condition,{});
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
    getCustomersHandler find all customer/patient from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

customer.getCustomersHandler = async function(req,res,next) {
    log.info("customersHandler.js, Handlers: getCustomersHandler")
    try {
        //get user from user collection
    
          result = await customers.getCustomers();
         // if data exist and record found
         if(typeof result != "undefined") {
            res.send(200, {data: result});
            
        }
        //no data found in DB return 400 status code with error
        else res.send(400, {error: "No customer Found"}); //ToDo Error Code
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
