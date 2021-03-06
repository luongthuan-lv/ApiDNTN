let mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    location: {
        lon: {type: String, default: null},
        lat: {type: String, default: null}
    },
    place: {
        type: String, default: null
    },
    information: {
        type: String, default: null
    },
    avatar: {
        type: Array, default: null
    },
    way: {
        type: String,
        default: null,
    },
    lang_id: {
        type: mongoose.Types.ObjectId,
        ref: 'language'
    },
    vehicle_id: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
});

tourSchema.virtual("categories", {
    ref: "category",
    localField: "cate_id",
    foreignField: "_id"
});

tourSchema.virtual("languages", {
    ref: "language",
    localField: "lang_id",
    foreignField: "_id"
});

module.exports = tourSchema;