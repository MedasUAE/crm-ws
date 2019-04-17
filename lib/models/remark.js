const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp')
    log = require('../logger');

const RemarkSchema = new mongoose.Schema({
    // Name of the table from the remark is created
    collectionName: {
        type: String,
        trim: true
    },
    //Row ID of the collection (call id)
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
    }
    // customer_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Customer'
    // }
});

// adding timstamps before creating record
RemarkSchema.plugin(timestamps)

//Mongoos user model
const Remark = mongoose.model('Remark', RemarkSchema);

let remark = {};

/**
 * 
 * @param {*} remarkObject 
 */
remark.create = function(remarkObject){

}

/**
 * 
 * @param {*} condition 
 * @param {*} projections 
 */
remark.get = function(condition, projections){

}

module.exports = remark;