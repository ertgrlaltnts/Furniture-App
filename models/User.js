const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Furniture = require('./Furniture');


const UserSchema = new Schema ({

    name : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },

    email : {
        type : String,
        unique : true,
        required : true,
    },

    role : {
        type : String,
        required :true,
        default : 'customer'
    },

    password : {
        type : String,
        required : true,
    },

    favourites : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Furniture'
    }],

    createdAt : {
        type : Date,
        default : Date.now
    }
});


UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


const User = mongoose.model('User' , UserSchema);
module.exports = User;