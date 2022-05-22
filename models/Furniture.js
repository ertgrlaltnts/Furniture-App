const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;
const Category = require('./Category');
const User = require('./User');


const FurnitureSchema = new Schema({

    name : {
        type : String,
        required:true
    },

    description : {
        type : String,
        required : true,
    },
    
    createdAt : {
        type : Date,
        default : Date.now
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    
    creater : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    slug : {
        type : String,
        unique : true,
        lowercase:true
    }

});


FurnitureSchema.pre('save' , function(next){
    this.slug = slugify(this.name);
    next();
})


const Furniture = mongoose.model('Furniture' , FurnitureSchema);


module.exports = Furniture;