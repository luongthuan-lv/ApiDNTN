let mongoose=require('mongoose');
const reportSchema=new mongoose.Schema({
    user:{
        type:String,
        required:false,
    },
    tour:{
        type:mongoose.Types.ObjectId,
        required: false,
    },
    star:{
        type:Number,
        required:false,
    },
    report:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:false,
    },
    avatar:{
        type:String,
        required:false,
    },
    date:{
        type:String,
        required:false,
    }
});

module.exports=reportSchema;