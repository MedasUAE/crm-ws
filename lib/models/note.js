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
            trim: true
        },
        name: {
            type: String,
            trim: true
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
    remarks: [{
        remark: {
            type: String,
            trim: true
        },
        createdDate: {
            type: String,
            trim: true
        },
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
    }],
    status: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    }
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
    log.info("note model createNote")
    let noteObject = new Note(noteObj);
    return new Promise((resolve, reject) => {
        noteObject.save((err, result) => {
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
 *  findOneNote find one note by note id from  DB 
 * @param {*} condition 
 * @param {*} projections 
 */
note.findOneNote = function (condition, projections) {
    log.info("note model findOneNote")
    return new Promise((resolve, reject) => {
        Note.findOne(condition, projections, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result.toObject());
        });
    });
}

/*
    updateNote update an existing note.  
    @params:    noteObj: contains note details.             
*/
note.updateNote = function (id, noteObj) {
    log.info("note model updateNote");
    return new Promise((resolve, reject) => {
        if (!id) return reject("Id not found");
        //find and update object by id
        Note.update({ _id: id }, noteObj, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });

}

/*
    searchNote   existing notes.  
    @params:    condition: contains Filters. 
    @params:    projection: decide no fields to select.            
*/
note.searchNote = function (condition, projection) {
    log.info("note.js model searchNote")
    log.debug(condition)
    return new Promise((resolve, reject) => {
        Note.find(condition, projection, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });
}


module.exports = note;