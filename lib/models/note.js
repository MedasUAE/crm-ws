const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp')
log = require('../logger');

let note = {};

const NoteSchema = new mongoose.Schema({
    message: {
        type: String,
        trim: true 
    },
    createdBy: {
        id: {
            type: Number,
            trim: true,
            required: false,
        },
        name: {
            type: String,
            trim: true,
            required: false,
        }
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   
    createdDate: {
        type: String,
        trim: true
    },
    remainderDate: {
        type: String,
        trim: true
    },
    remarks: [{ remark: {
        type: String,
        trim: true
    },
    createdDate: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        trim: true
    }
    }], 
    status: {
        type: Boolean,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
});

// adding timstamps before creating record
NoteSchema.plugin(timestamps)

//Mongoos user model
const Note = mongoose.model('Note', NoteSchema);

/*
    createNotes create new notes in the DB 
    @params:    noteObj: contains note details.              
*/
note.createNote = function (noteObj) {
    log.info("note model createNotes")
    let note = new Note(noteObj);
    return new Promise((resolve, reject) => {
        note.save((err, result) => {
            log.debug(result)
            if (err) {
                if (err._message) return reject(err._message);
                return reject(err);
            }
            return resolve(result.toObject());
        });
    });
};


/*
**
 *  findOneConsultation find one consultation by consult id from  DB 
 * @param {*} condition 
 * @param {*} projections 
 */
note.findOneNote = function (condition, projections) {
    log.info("consultation model findOneConsultation")
    return new Promise((resolve, reject) => {
        // Users.findOne({username,password},{},(err,result)=>{
            Consultation.findOne(condition, projections, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result.toObject());
        });
    });
}

// /*
//     updateConsultation update an existing consultation.  
//     @params:    consultationObj: contains consultation details.             
// */
// consultations.updateConsultation = function (id, consultationObj) {
//     log.info("consultation model updateConsultation");
//     return new Promise((resolve, reject) => {
//         if (!id) return reject("Id not found");
//         //find and update object by id
//         console.log("ccccc", consultationObj);
//         Consultations.update({ _id: id }, consultationObj, (err, result) => {
//             log.debug(result)
//             if (err) return reject(err);
//             return resolve(result);
//         });
//     });

// }

// /*
//     searchConsultation update an existing consultation.  
//     @params:    consultationObj: contains consultation details.             
// */
// consultations.searchConsultation = function (condition, projection) {
//     log.info("consultation.js model searchConsultation")
//     log.debug(condition)
//     return new Promise((resolve, reject) => {
//         Consultations.find(condition, projection, (err, result) => {
//             log.debug(result)
//             if (err) return reject(err);
//             return resolve(result);
//         });
//     });
// }


module.exports = note;