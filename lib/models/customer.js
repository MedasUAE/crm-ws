const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp')
log = require('../logger');

let customers = {};

const CustomerSchema = new mongoose.Schema({
    demography: {
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
        gender: {
            type: String,
            trim: true,
            required: true,
        },
        dob: {
            type: Date,
            trim: true,
            //  required: true,
        },
        meritalStatus: {
            type: String,
            trim: true,
            //  required: true,
        },
        opNo: {
            type: String,
            trim: true

        },
        residenceId: {
            type: String,
            trim: true

        },
        nationality: {
            type: String,
            trim: true

        },
        otherId: {
            type: String,
            trim: true

        },
        otherIdName: {
            type: String,
            trim: true

        }
    },
    contact: {
        mobile: [{
            type: Number,
            required: true,
        }],
        email: {
            type: String,
            trim: true,

        },
        address: {
            type: String,
            trim: true,

        },
        city: {
            type: String,
            trim: true,

        }

    },
    coordinator: {
        userId: {
            type: String,
            trim: true,
            // required: true,
        },
        userName: {
            type: String,
            trim: true,
            //  required: true,
        }

    },
    fileOpen: {
        type: Boolean,
        trim: true
    },
    source: {
        type: String,
        trim: true

    },

    createdBy: {
        type: String,
        trim: true

    },
    officeId: {
        type: Number,
        trim: true,

    }

});

// adding timstamps before creating record
CustomerSchema.plugin(timestamps)

// opNo validate
CustomerSchema.path('opNo').validate(async (value) => {
    const unCount = await Users.count({ opNo: value });
    log.debug("unCount", unCount)
    return !unCount;
}, 'OP No already exists');

//Mongoos user model
const Customers = mongoose.model('Customers', CustomerSchema);

/*
    createCustomer create new Customer in the DB 
    @params:    customerObj: contains customer/patient details.              
*/
customers.createCustomer = function (customerObj) {
    log.info("customers model createCustomer")
    let customer = new Customers(customerObj);
    return new Promise((resolve, reject) => {
        customer.save((err, result) => {
            log.debug(result)
            if (err) {
                if (err._message) {
                    log.error(err)
                    return reject(err._message);
                }
                return reject(err);
            }
            return resolve(result.toObject());
        });
    });
};

/*
    updateCustomer update an existing customer/patient.  
    @params:    customerObj: contains custmer details.             
*/
customers.updateCustomer = function (id, customerObj) {
    log.info("customer model updateCustomer");
    return new Promise((resolve, reject) => {
        if (!id) return reject("Id not found");
        //find and update object by id
        console.log("ccccc", customerObj);
        Customers.update({ _id: id }, customerObj, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });

}

customers.searchCustomer = function (condition, projection) {
    log.info("customer.js model searchCustomer")
    log.debug(condition)
    return new Promise((resolve, reject) => {
        Customers.find(condition, projection, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

/*
    getUsers find all user from  DB               
*/
customers.getCustomers = function () {
    log.info("customers model getCustomers")
    return new Promise((resolve, reject) => {
        Customers.find((err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

module.exports = customers;