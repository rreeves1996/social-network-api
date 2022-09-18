const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const { getDate } = require('../utils/helpers');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: getDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);
  
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);
  
module.exports = Thought;