const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp')
    log = require('../logger');
    let remark = {};

const RemarkSchema = new mongoose.Schema({
    // Name of the table from the remark is created
    collectionName: {
        type: String,
        trim: true
    },
    //Row ID of the collection (call id) from where it is created.
    documentId:{
        type: String,
        trim: true
    },
    //Created by Remark
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
    //priviledge to view the remark ALL, CALLER, RECEPTIONIST
    priviledge: [],

    remark: {
        type:String,
        trim:true
    },
     customerId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Customer'
     }
});

// adding timstamps before creating record
RemarkSchema.plugin(timestamps)

//Mongoos user model
const Remark = mongoose.model('Remark', RemarkSchema);

/*
    createCall create new call in the DB 
    @params:    callObj: contains call details.              
*/
remark.createRemark = function (obj) {
    log.info("remark model createRemark")
    let Object = new Remark(obj);
    return new Promise((resolve, reject) => {
        Object.save((err, result) => {
            log.debug(result)
            if (err) {
                if (err._message) {
                    log.error(err);
                    return reject(err._message);
                }
                return reject(err);
            }
            return resolve(result.toObject());
        });
    });
};

/*
**
 *  findOneRemark find one remark by call id from  DB 
 * @param {*} condition 
 * @param {*} projections 
 */
remark.findOneRemark = function (condition, projections) {
    log.info("remark model findOneRemark")
    return new Promise((resolve, reject) => {
        Remark.findOne(condition, projections, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result.toObject());
        });
    });
}

/*
    updateRemark update an existing note.  
    @params:    callObj: contains call details.             
*/
remark.updateRemark = function (id, obj) {
    log.info("Remark model updateRemark");
    return new Promise((resolve, reject) => {
        if (!id) return reject("Id not found");
        //find and update object by id
        Remark.update({ documentId: id }, obj, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });

}

module.exports = remark;