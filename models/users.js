const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Posts'}]
})

module.exports = mongoose.model('User', userSchema);