const Thought = require('./Thought')
const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [isEmail, 'Please enter valid email'],
            trim: true
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: Thought
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;