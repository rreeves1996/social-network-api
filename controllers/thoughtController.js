const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ errMessage: 'Thought not found!' })
                    : res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => 
                !thought
                    ? res.status(404).json({ errMessage: 'Thought not found!' })
                    : res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: req.body.userId, username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true })
                .then((user) => 
                    !user
                        ? res.status(404).json({ errMessage: 'User not found!' })
                        : res.json(user))
                })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ errMessage: 'Thought not found!' })
                    : res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
                ! thought
                    ? res.status(404).json({ errMessage: 'Thought not found!' })
                    : res.json({ message: `Thought: '${thought.thoughtText}' by '${thought.username}' has been succesfully deleted!` }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true })
            .then((thought) =>
                ! thought
                    ? res.status(404).json({ errMessage: 'Thought not found!' })
                    : res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true })
            .then((thought) =>
                ! thought
                    ? res.status(404).json({ errMessage: 'Thought not found!' })
                    : res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
}