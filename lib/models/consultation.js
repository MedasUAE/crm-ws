const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp')
log = require('../logger');

let consultations = {};

const ConsultationSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },

    date: {
        type: String,
        trim: true

    },
    time: {
        type: Number,
        trim: true

    },
    payment: {
        type: {
            type: String,
            trim: true
          
        },
        total: {
            type: Number,
            trim: true
          
        },
        emis: {
            type: Number,
            trim: true,
           // required: true
        },
        comment: {
            type: String,
            trim: true

        }
    },
    installments: [{
        date: {
            type: String,
            trim: true

        },
        amount: {
            type: String,
            trim: true

        },
        commnet: {
            type: String,
            trim: true

        }
    }],
    medicalsummary: [{
        label: {
            type: String,
            trim: true

        },
        value: {
            type: String,
            trim: true

        },
        note: {
            type: String,
            trim: true

        },
        date: {
            type: String,
            trim: true

        }
    }],
    noOfHair: {
        type: String,
        trim: true

    }

});

// adding timstamps before creating record
ConsultationSchema.plugin(timestamps)

//Mongoos consultations model
const Consultation = mongoose.model('Consultation', ConsultationSchema);

/*
    createConsultation create new Consultation in the DB 
    @params:    consultationObj: contains customer/patient details.              
*/
consultations.createConsultation = function (consultationObj) {
    log.info("consultation model createConsultation")
    let consultation = new Consultation(consultationObj);
    return new Promise((resolve, reject) => {
        consultation.save((err, result) => {
            log.debug(result)
            if (err) {
                if (err._message) {
                    log.error(err._message)
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
 *  findOneConsultation find one consultation by consult id from  DB 
 * @param {*} condition 
 * @param {*} projections 
 */
consultations.findOneConsultation = function (condition, projections) {
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

/*
    updateConsultation update an existing consultation.  
    @params:    consultationObj: contains consultation details.             
*/
consultations.updateConsultation = function (id, consultationObj) {
    log.info("consultation model updateConsultation");
    return new Promise((resolve, reject) => {
        if (!id) return reject("Id not found");
        //find and update object by id
        console.log("ccccc", consultationObj);
        Consultation.update({ _id: id }, consultationObj, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });

}

/*
    searchConsultation update an existing consultation.  
    @params:    consultationObj: contains consultation details.             
*/
consultations.searchConsultation = function (condition, projection) {
    log.info("consultation.js model searchConsultation")
    log.debug(condition)
    return new Promise((resolve, reject) => {
        Consultation.find(condition, projection, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        }).populate([{path:'customer_id', select:'demography.opNo demography.fullName'}]);
    });
}



module.exports = consultations;