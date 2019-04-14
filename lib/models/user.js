const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp')
log = require('../logger');

let users = {};

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    activeDate: {
        type: Date
    },
    activeStatus: {
        type: Boolean,
        trim: true,
        required: true,
        default: true
    },
    userLabel: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    userType: {
        type: String,
        trim: true,
        required: true,
    },
    office: {
        officeId: {
            type: Number,
            trim: true,
            required: false,
        },
        officeName: {
            type: String,
            trim: true,
            required: false,
        }

    }
});

// adding timstamps before creating record
UserSchema.plugin(timestamps)

// userName validate
UserSchema.path('userName').validate(async (value) => {
    const unCount = await Users.count({ userName: value });
    log.debug("unCount", unCount)
    return !unCount;
}, 'User Name already exists');

//Mongoos user model
const Users = mongoose.model('Users', UserSchema);


/**
 * 
 * @param {*} conditions 
 * @param {*} projections 
 */
users.findOne = function (conditions, projections) {
    log.info("users model findOne")
    return new Promise((resolve, reject) => {
        // Users.findOne({username,password},{},(err,result)=>{
        Users.findOne(conditions, projections, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result.toObject());
        });
    });
}

/**
 * 
 * @param {*} conditions 
 * @param {*} projections 
 */
users.searchUser = function (condition, projection) {
    log.info("users model searchUser")

    return new Promise((resolve, reject) => {
        Users.find(condition, projection, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });



}

/*
    getUsers find all user from  DB               
*/
users.getUsers = function () {
    log.info("users model getUsers")
    return new Promise((resolve, reject) => {
        Users.find((err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });
}


/*
    createUser create new user in the DB 
    @params:    userObj: contains user details.              
*/
users.createUser = function (userObj) {
    log.info("users model createUser")
    let user = new Users(userObj);
    return new Promise((resolve, reject) => {
        user.save((err, result) => {
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
    updateUser update an existing user.  
    @params:    userObj: contains user details.             
*/
users.updateUser = function (id, userObj) {
    log.info("users model updateUser")
    return new Promise((resolve, reject) => {
        if (!id) return reject("Id not found");
        //find and update object by id
        Users.update({ _id: id }, userObj, (err, result) => {
            log.debug(result)
            if (err) return reject(err);
            return resolve(result);
        });
    });

}

module.exports = users;