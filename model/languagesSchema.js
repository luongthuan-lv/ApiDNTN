let mongoose = require('mongoose');
const languagesSchema = new mongoose.Schema({
    lang_name: {
        type: String,
        required: false,
    },
});
module.exports=languagesSchema;