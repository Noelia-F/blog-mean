const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: String,
    content: String,
    photoUrl: String,
    date: Date,
    published: Boolean,
    category: String,
    author: { type: Schema.Types.ObjectId, ref: 'User'}
});

postSchema.statics.published = function (callback) {
    this.model('Posts').find({published: true}, callback);
}

module.exports = mongoose.model('Posts', postSchema);