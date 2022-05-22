const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name : {
        type: String,
        unique : true,
        required : true
    },

    createdAt : {
        type : Date,
        default : Date.now,
    },

    slug : {
        type : String,
        unique : true,
        lowercase : true,
    }
});


CategorySchema.pre('save' , function(next){
    this.slug = slugify(this.name);
    next();
})


const Category = mongoose.model('Category' , CategorySchema);


module.exports = Category;