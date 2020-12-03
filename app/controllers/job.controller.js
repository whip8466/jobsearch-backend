const mongoose = require('mongoose');
const Jobs = require("../models/Jobs");
const JobTags = require("../models/JobTags");
const filter = require("lodash/filter");

exports.create = (req, res) => {
  const {
      title,
      designation,
      location,
      qualifications,
      yearOfExp,
      description,
      tags,
  } = req.body;

  const job = new Jobs({
    title,
    designation,
    location,
    qualifications,
    yearOfExp,
    description
  });

    job.save(function(error, data){
        if(error) {
            return res.status(500).json({
                success: false,
                message: "Some error occurred while creating the job."
            });
        } else {
            let jobTagsData = [];
            filter(tags,  tag => {
                jobTagsData = [
                    ...jobTagsData,
                    {
                        jobId: mongoose.Types.ObjectId(data._id),
                        tagName: tag.name,
                        rank: tag.rank,
                    }
                ]
            });

            JobTags.insertMany(jobTagsData)
                .then(function(docs) {
                    return res.status(200).json({
                        success: true,
                        message: "Jobs created successfully!",
                        job: data,
                    });
                })
                .catch(function(err) {
                    console.log({err});
                    return res.status(500).json({
                        success: false,
                        message: "Some error occurred while creating the job."
                    });
                });
        }
    });
};

exports.update = (req, res) => {
    const {
        title,
        designation,
        location,
        qualifications,
        yearOfExp,
        description,
        tags,
    } = req.body;

    const updateObj = {
        title,
        designation,
        location,
        qualifications,
        yearOfExp,
        description
    };

    Jobs.findByIdAndUpdate(req.params.id, updateObj, {new: true}, function (err, data) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: "Some error occurred while updating the jobs."
            });
        } else {

            JobTags.remove({ jobId: mongoose.Types.ObjectId(data._id) }, (err, response) => {
                if(err) {
                    return res.status(500).json({
                        success: false,
                        message: "Some error occurred while updating the jobs."
                    });
                }

                let jobTagsData = [];
                filter(tags,  tag => {
                    jobTagsData = [
                        ...jobTagsData,
                        {
                            jobId: mongoose.Types.ObjectId(data._id),
                            tagName: tag.name,
                            rank: tag.rank,
                        }
                    ]
                });

                JobTags.insertMany(jobTagsData)
                    .then(function(docs) {
                        return res.status(200).json({
                            success: true,
                            message: "Jobs updated successfully!",
                            job: data,
                        });
                    })
                    .catch(function(err) {
                        console.log({err});
                        return res.status(500).json({
                            success: false,
                            message: "Some error occurred while creating the job."
                        });
                    });

            });
        }
    });
};

exports.findAll = (req, res) => {
    Jobs.aggregate([{
        $lookup: {
            from: "jobtags",
            localField: "_id",
            foreignField: "jobId",
            as: "jobTags"
        }
    }]).exec(function(err, results){
        if(err) {
            return res.status(500).send({
                success: false,
                message:
                err.message || "Some error occurred while retrieving jobs."
            });
        }

        return res.send({
            success: true,
            message: "Jobs fetch successfully.",
            jobs: results
        });
    });
};

exports.remove = (req, res) => {
    Jobs.findOneAndRemove({_id: req.params.id}, req.body, function(err,data)
    {
        if(err){
            console.log({err})
            res.status(500).send({
                success: false,
                message: "Some error occurred while removing job."
            });
        }

        res.send({
            success: true,
            message: "Job removed successfully.",
        });
    });
};


exports.SearchJobs = (req, res) => {
    const searchQuery =  req.params.searchQuery;
    let match = {};
    if (searchQuery && searchQuery !== 'all') {
        match = {
            $or: [
                { "jobTags.tagName": { $regex: searchQuery, $options: "i" } },
                { "title": { $regex: searchQuery, $options: "i" } },
                { "designation": { $regex: searchQuery, $options: "i" } },
                { "location": { $regex: searchQuery, $options: "i" } },
                { "qualifications": { $regex: searchQuery, $options: "i" } },
                { "yearOfExp": { $regex: searchQuery, $options: "i" } },
                // { "description": { $regex: searchQuery, $options: "i" } },
            ],
        };
    }

    Jobs.aggregate([
        {
            $lookup: {
                from: "jobtags",
                localField: "_id",
                foreignField: "jobId",
                as: "jobTags"
            }
        },
        { "$match": match }
    ]).exec(function(err, results){
        if(err) {
            return res.status(500).send({
                success: false,
                message:
                err.message || "Some error occurred while searching jobs."
            });
        }

        return res.send({
            success: true,
            message: "Jobs searched  successfully.",
            searchedJobsList: results
        });
    });
};