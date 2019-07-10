const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    questionOneAnswer:{
        type:String,
        required:true,
        trim:true,

    },
    questionTwoAnswer:{
        type:[String],
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const History = mongoose.model('History',historySchema);

module.exports = History;