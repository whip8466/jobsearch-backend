const Users = require("../models/Users");

exports.login = (req, res) => {
    const { email, password } = req.body;
    Users
        .find({email, password}, (err,doc) => {
        if(err) {
            res.status(500).json({
                message:
                err.message || "Some error occurred while creating the blog."
            });
        }
            res.json(doc);
        });
};


exports.create = (req, res) => {
    const data = req.body;

    // Create a Users
    const user = new Users(data);

    // Save user in the database
    user.save(user).then(resp => {
        res.json(resp);
    }).catch(err => {
        res.status(500).json({
            message:
                err.message || "Some error occurred while register."
        });
    });
};

// Retrieve all blogs from the database.
exports.getAllUser = (req, res) => {
    Users.find({})
        .then(data => {
        res.send({
            success: true,
            message: "User fetch successfully.",
            usersList: data
        });
})
.catch(err => {
        res.status(500).send({
            success: false,
            message:
                err.message || "Some error occurred while retrieving User."
        });
});
};
