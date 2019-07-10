const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    dateTime:{
        type:String,
        required:true,
        trim:true,
    },
})

userSchema.virtual('userHistory',{
    ref:'History',
    localField:'_id',
    foreignField:'owner'
})

const User = mongoose.model('User',userSchema);

module.exports = User;