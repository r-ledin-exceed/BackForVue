const User = require('../models/product.model');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.product_login = (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.product_register = (req, res) => {
    
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });
    console.log(user.email)

   user.save((err) => {
        if (err) { return null; } else {
            res.send('everything is ok');
        }
   });
};

