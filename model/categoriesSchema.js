let mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: false,
    },
    cate_name: {
        type: String,
        required: false,
    },
    router: {
        type: String,
        required: false,
    },
    lang_id: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref:'language',
    },
});

categoriesSchema.virtual("languages",{
    ref:"language",
    localField: "lang_id",
    foreignField: "_id"
});

// categoriesSchema.statics = {
//     createNew(item){
//         return this.create(item)
//     },
//     listAll() {
//         return this.find().populate("languages").exec()
//     },
//     removeById(id){
//         return this.findByIdAndRemove(id).exec()
//     },
//     countItem(){
//         return this.countDocuments({}).exec()
//     }
// };
module.exports=categoriesSchema;