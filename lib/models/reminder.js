const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp')
    log = require('../logger');
    let reminder = {};
 
const ReminderSchema = new mongoose.Schema({
    // Reminder date
    date: {
        type: String,
        trim: true
    },
    //reminder type payment ,Treatment,File open ,other
    type:{
        type: String,
        enum: ["FileOpen","Payment", "Treatment","Medicine","Other"]
    },
    status:{
        type: String,
        enum: ["Open", "Close"],
        default:"Open"

    },
    
    message: {
        type:String,
        trim:true
    },
    //  customerId: {
    //      type: mongoose.Schema.Types.ObjectId,
    //      ref: 'Customer'
    //  },
    patient: {
        opNo: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        consultId: {
            type: String,
            trim: true
        }
    },
     // Reminder Created by 
    createdBy: {
        id: {
            type: Number,
            trim: true
        },
        name: {
            type: String,
            trim: true
        }
    },
     // reminder createdFor
     createdFor: {
        id: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true
        }
    },
    //priviledge to view the remark ALL, CALLER, RECEPTIONIST
    priviledge: []
});

// adding timstamps before creating record
ReminderSchema.plugin(timestamps)

//Mongoos Reminder model
const Reminder = mongoose.model('Reminder', ReminderSchema);

/*
    createReminder create new reminder in the DB 
    @params:    obj: contains reminder details.              
*/
reminder.createReminder = function (obj) {
    log.info("reminder model createReminder")
    let Object = new Reminder(obj);
    return new Promise((resolve, reject) => {
        Object.save((err, result) => {
             if (err) {
                if (err._message) {
                    log.error(err);
                    return reject(err._message);
                }
                return reject(err);
            }
            return resolve(result);
        });
    });
};

/*
**
 *  findOneReminder find one reminder by reminder id from  DB 
 * @param {*} condition 
 * @param {*} projections 
 */
reminder.findOneReminder = function (condition, projections) {
    log.info("reminder model findOneReminder")
    return new Promise((resolve, reject) => {
        Reminder.findOne(condition, projections, (err, result) => {
              if (err) return reject(err);
            return resolve(result);
        });
    });
}

/*
    updateReminder update an existing reminder.  
    @params:    obj: contains reminder details.             
*/
reminder.updateReminder = function (id, obj) {
    log.info("reminder model updateReminder");
    return new Promise((resolve, reject) => {
        if (!id) return reject("Id not found");
        //find and update object by id
        Reminder.updateOne({ _id: id }, obj, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

/*
    searchReminder   existing reminders.  
    @params:    condition: contains Filters. 
    @params:    projection: decide no of fields to select.            
*/
reminder.searchReminder = function (condition, projection) {
    log.info("reminder.js model searchReminder")
    return new Promise((resolve, reject) => {
        Reminder.find(condition, projection, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        }).sort( { createdAt: -1} );
    });
}

/*
    countReminder   existing reminders.  
    @params:    condition: contains Filters. 
    @params:    projection: decide no of fields to select.            
*/
reminder.countReminder = function (condition) {
    log.info("reminder.js model countReminder")
    return new Promise((resolve, reject) => {
        Reminder.countDocuments(condition, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

module.exports = reminder;