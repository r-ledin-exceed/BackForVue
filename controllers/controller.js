const User = require('../models/model');
//Simple version, without validation or sanitation

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.login = (req, res) => {

    // if (!req.body.title) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }

    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.register = (req, res) => {

    console.log(req.body.email)
    let user = new User({
        email: req.body.email,
        password: req.body.password,
    });

   user.save((err) => {
        if (err) { return null; } else {
            res.send('everything is ok');
        }
   });

};

exports.addMarker = (req, res) => {
    const id = req.params.id;
    
    User.findById(id, function (err, user) {
        if (err) return next(err);


        user.save((err) => {
            if (err) { return null; } else {
                res.send('everything is ok');
            }
       });
    })
    

}

