const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({

    email: {type: String},
    password: {type: String},

    items: [{
        name: String,
        coords: [Number, Number],
        url: String,
    }]
    
});

// Export the model
module.exports = mongoose.model('User', Users);
