// const log = require('./logger');
const auth = require('./auth');
const user = require('./handlers/userHandler');
const customer = require('./handlers/customerHandler');
const consultation = require('./handlers/consultationHandler');
const call = require('./handlers/callHandler');
const remark = require('./handlers/remarkHandler');


module.exports = function (server, restify) {
    //login api
    server.post('/login', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: auth.loginV1Handler },
        { version: '2.0.0', handler: auth.loginV2Handler },
        { version: '3.0.0', handler: auth.loginV3Handler }
    ]));

    // user
    //get  users
    server.get('/user/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: user.getOneUserHandler }
    ]));

    //create  user
    server.post('/user', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: user.createUserHandler }
    ]));

    //edit  user
    server.put('/user/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: user.updateUserHandler }
    ]));

    //search user
    server.get('/users', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: user.searchUserHandler }
    ]));

    // customer
    //get  customers
    server.get('/customer/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: customer.getOneCustomerHandler }
    ]));

    //create  customer
    server.post('/customer', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: customer.createCustomerHandler }
    ]));

    //edit  customer
    server.put('/customer/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: customer.updateCustomerHandler }
    ]));

    //search customer
    server.get('/customers', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: customer.searchCustomerHandler }
    ]));

    // consultation
    // get  consultation
    server.get('/consultation/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: consultation.getOneConsultationHandler }
    ]));
    //  // get  consultation by customer Id
    //  server.get('/consultationbycustomerid/:id', restify.plugins.conditionalHandler([
    //     { version: '1.0.0', handler: consultation.getOneConsultationBycustIdHandler }
    // ]));

    //create  consultation
    server.post('/consultation', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: consultation.createConsultationHandler }
    ]));

    // //edit  consultation
    server.put('/consultation/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: consultation.updateConsultationHandler }
    ]));

    // //search consultation
    server.get('/consultations', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: consultation.searchConsultationHandler }
    ]));

    // call
    // get  call
    server.get('/call/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: call.getOneCallHandler }
    ]));

    //create  call
    server.post('/call', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: call.createCallHandler }
    ]));

    // edit  call
    server.put('/call/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: call.updateCallHandler }
    ]));

     //search call
    server.get('/calls', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: call.searchCallHandler }
    ]));

    // remark
    //get  remark
    server.get('/remark/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: remark.getOneRemarkHandler }
    ]));

    //create  remark
    server.post('/remark', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: remark.createRemarkHandler }
    ]));

    // // edit  remark
    server.put('/remark/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: remark.updateRemarkHandler }
    ]));

      //search remark
    server.get('/remarks', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: remark.searchRemarkHandler }
    ]));

} 