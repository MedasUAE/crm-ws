// const log = require('./logger');
const auth = require('./auth');
const user = require('./handlers/userHandler');
const customer = require('./handlers/customerHandler');
const consultation = require('./handlers/consultationHandler');
const note = require('./handlers/noteHandler');


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

    // note
    // get  note
    server.get('/note/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: note.getOneNoteHandler }
    ]));

    //create  note
    server.post('/note', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: note.createNoteHandler }
    ]));

    // edit  note
    server.put('/note/:id', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: note.updateNoteHandler }
    ]));

    // // //search notes
    server.get('/notes', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: note.searchNoteHandler }
    ]));

}