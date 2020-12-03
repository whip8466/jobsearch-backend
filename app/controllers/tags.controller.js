const Tags = require("../models/Tags");

exports.create = (req, res) => {
  const { name, rank } = req.body;

  const tag = new Tags({
      name,
      rank,
  });

    tag.save(function(error, data){
        if(error) {
            console.log({error})
            return res.status(500).json({
                success: false,
                message: "Some error occurred while creating the tags."
            });
        }

        res.status(200).json({
            success: true,
            message: "Tags created successfully!",
            tag: data,
        });
    });
};

exports.update = (req, res) => {
    const updateObj = {
        name: req.body.name
    };

    Tags.findByIdAndUpdate(req.params.id, updateObj, {new: true}, function (err, data) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: "Some error occurred while updating the tags."
            });
        }

        res.status(200).json({
            success: true,
            message: "Tags updated successfully!",
            tag: data,
        });
    });
};


exports.findAll = (req, res) => {
    Tags.find({})
    .then(data => {
      res.send({
          success: true,
          message: "Tags fetch successfully.",
          tags: data
      });
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving tags."
      });
    });
};

exports.remove = (req, res) => {
    Tags.findOneAndRemove({_id: req.params.id}, req.body, function(err,data)
    {
        if(err){
            res.status(500).send({
                success: false,
                message: "Some error occurred while removing tags."
            });
        }

        res.send({
            success: true,
            message: "Tags removed successfully.",
        });
    });
};