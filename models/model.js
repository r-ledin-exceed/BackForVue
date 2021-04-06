const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({

    email: {type: String},
    password: {type: String},

    items: [{
        name: {type: String},
        coords: [Number, Number],
        url: {type: String},
    }]
    
});

// Export the model
module.exports = mongoose.model('Users', User);
