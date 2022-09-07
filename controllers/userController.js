const { User, Thought } = require('../models');

module.exports =  {
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ errMessage: 'User not found!' })
                    : res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) => 
                !user
                    ? res.status(404).json('User not found!')
                    : res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                !user
                    ? res.status(404).json({ errMessage: 'User not found!' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } });
                        res.json({ message: `User ${user.username} successfully deleted!` });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true })
            .then((user) => 
                !user
                    ? res.status(404).json({ errMessage: 'User not found!' })
                    : res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId} },
            { new: true })
            .then((user) => 
                !user
                    ? res.status(404).json({ errMessage: 'User not found!' })
                    : res.json({ message: 'Friend succesfully deleted!', user }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    }
}