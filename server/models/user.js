const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
    },
});


module.exports = mongoose.model("User", userSchema);

