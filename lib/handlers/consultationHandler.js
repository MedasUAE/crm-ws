const log = require('../logger');
const consultationModel = require('../models/consultation');
const remarkModel = require('../models/remark');
const customerModel = require('../models/customer');

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
    if (req.body.customerId) consultationObj.customerId = req.body.customerId;
    if (req.body.date) consultationObj.date = req.body.date;
    if (req.body.time) consultationObj.time = req.body.time;
    if (req.body.payment) consultationObj.payment = req.body.payment;
    if (req.body.installments) consultationObj.installments = req.body.installments;
    if (req.body.medicalsummary) consultationObj.medicalsummary = req.body.medicalsummary;

    if (req.body.hairType) consultationObj.hairType = req.body.hairType;
    if (req.body.implantType) consultationObj.implantType = req.body.implantType;
    if (req.body.noOfHair) consultationObj.noOfHair = req.body.noOfHair;
    //if (req.body.remark) consultationObj.remark = req.body.remark;
    if (req.body.implantArea) consultationObj.implantArea = req.body.implantArea;
    if (req.body.prp) consultationObj.prp = req.body.prp;
    if (req.body.bloodTest) consultationObj.bloodTest = req.body.bloodTest;
    try {
        log.debug("getting consult obejct to create" + JSON.stringify(consultationObj))
        //create consultation
        consultationrResult = await consultationModel.createConsultation(consultationObj);
        
      //update consultationId in customer
     if(consultationObj.customerId)  updateCustResult = await customerModel.updateCustomer({_id: consultationObj.customerId},{consultationId: consultationrResult._id});
           
     let remarkData = {documentId:consultationrResult._id,
        remark:req.body.remark,
        collectionName:'Consultation',
        createdBy:'101', 
        customerId: consultationObj.customerId
    }
  
        //create Remarks
     
  if(req.body.remark)  remarkResult = await remarkModel.createRemark(remarkData);
  let results = {
    consultationrResult,remarkResult,updateCustResult
  }


        // if data exist and record found
        if (typeof results != "undefined") {
            res.send(200, { data: results });

        }
        //no data found in DB return 400 status code with error
        else res.send(400, { error: "No consultation created" }); //ToDo Error Code
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

consultation.getOneConsultationHandler = async function (req, res, next) {
    log.info("consultationHandler.js, Handlers: getOneConsultationHandler");
    try {
        //get user from user collection
      //  result = await consultationModel.findOneConsultation({ _id: req.params.id }, {});


       
       //get customer from customer collection by customer id
       let customerResult = await customerModel.findOneCustomer({_id: req.params.id},{});
       console.log(customerResult);

       let consultResult;
       if(customerResult.consultationId) {
            //get consultation from consultation collection by consultatio Id
            consultResult = await consultationModel.findOneConsultation({_id: customerResult.consultationId},{});
        } 
         //get all Remarls from remark collection  by customer id
        let remarkResult = await  remarkModel.searchRemark({customerId: req.params.id},{});
      
        const results = {
            customerResult,
            consultResult,
            remarkResult
        }
       //console.log(results);
       
        // if data exist and record found
        if (typeof results != "undefined") {
            // generate token and add to result

            res.send(200, { data: results });

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
    getOneConsultationByConsultIdHandler find one consultation from  DB 
    @params:    req: request object, 
                res: response object, 
                next: callback method,        
*/

consultation.getOneConsultationByConsultIdHandler = async function (req, res, next) {
    log.info("consultationHandler.js, Handlers: getOneConsultationByConsultIdHandler");
    try {
        //get user from user collection
        consultResult = await consultationModel.findOneConsultation({ _id: req.params.id }, {});


        let remarkResult = await  remarkModel.searchRemark({customerId: consultResult.customerId._id},{});
      
        const results = {
            consultResult,
            remarkResult
        }
        // if data exist and record found
        if (typeof results != "undefined") {
            // generate token and add to result

            res.send(200, { data: results });

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
   console.log("*******req.body.consultationId******"+req.body.consultationId);
  // let id = req.body.consultationId;
    if (!id) {
        //no id found
        res.send(400, { error: "No ID Found" });
        //go to after handler
        return next();
    }

    let consultationObj = {};
    if (req.body.customerId) consultationObj.customerId = req.body.customerId;
    if (req.body.date) consultationObj.date = req.body.date;
    if (req.body.time) consultationObj.time = req.body.time;
    if (req.body.payment) consultationObj.payment = req.body.payment;
    if (req.body.installments) consultationObj.installments = req.body.installments;
    if (req.body.medicalsummary) consultationObj.medicalsummary = req.body.medicalsummary;
    if (req.body.noOfHair) consultationObj.noOfHair = req.body.noOfHair;

    if (req.body.hairType) consultationObj.hairType = req.body.hairType;
    if (req.body.implantType) consultationObj.implantType = req.body.implantType;
    //if (req.body.remark) consultationObj.remark = req.body.remark;
    if (req.body.implantArea) consultationObj.implantArea = req.body.implantArea;
    if (req.body.prp) consultationObj.prp = req.body.prp;
    if (req.body.bloodTest) consultationObj.bloodTest = req.body.bloodTest;
    //if (req.body.cost) consultationObj.cost = req.body.cost;
    if (req.body.rhinoplasty) consultationObj.rhinoplasty = req.body.rhinoplasty;
    // if (req.body.payment.emis) consultationObj.payment.emis = req.body.payment.emis;
    // if (req.body.payment.total) consultationObj.payment.total = req.body.payment.total;
    // if (req.body.payment.status) consultationObj.payment.status = req.body.payment.status;
    
   
    try {
        //get user from user collection
        updateResult = await consultationModel.updateConsultation(id, consultationObj);

         //create Remark

         let remarkData = {documentId: id,
            remark:req.body.remark,
            collectionName:'Consultation',
            createdBy:'101',
            customerId: consultationObj.customerId
        }
        let results = { updateResult}
      if(req.body.remark) {
        remarkResult = await remarkModel.createRemark(remarkData);
        console.log(remarkResult);
         results = {
            updateResult,remarkResult
          }
      } 
     
        // if data exist and record found
        if (typeof results != "undefined") {
            res.send(200, { data: results });
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
    if (req.query.customerId) condition["customerId"] = req.query.customerId;
    // if(req.query.coordinator)  condition["coordinator.userId"] =  req.query.userId;

    try {
        result = await consultationModel.searchConsultation(condition, {});
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

module.exports = consultation;
